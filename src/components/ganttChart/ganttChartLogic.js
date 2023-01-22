import * as d3 from "d3";

export function ganttChartLogic(){
    let width=400;
    let height=600;
    let margin={top:20,right:100,bottom:20,left:100};
    let xScale=d3.scaleTime();
    let yScale=d3.scaleLinear();
    let colorScale=d3.scaleLinear();
    let xValue=(d)=>d.date;
    let xYear=(d)=>d.year;

    let colorValue=(d)=>d.status;
    let barHeight=30;
    let barWidth=110;
    let frequency="date";
    let dateFormat=d3.timeParse("%d/%m/%Y");
    let colors=["#ffe7e7","#92E3C5","#d8d1f6"];

    let images=["a.png","b.png","c.png"];

    function getDataByFrequency(d){
        switch(frequency){
            case "date":
                return dateFormat(xValue(d));
                break;
            case "month":
                const dateSplit=dateFormat(xValue(d).toString().split(" "));
                const monthVal=dateSplit[3]==="Jan"
                ? dateSplit[3]+" "+dateSplit[1]
                :dateSplit[3];
                return monthVal;
                break;
            case "year":
                break;
            default:
                break;
        }
    }

    function chart(selection){
        d3.select(this).selectAll("svg").remove();
        selection.each(function(data){
            var svg = d3
            .select(this)
            .selectAll("svg")
            .data([data])
            .enter()
            .append("svg");
        
        svg
        .attr("width", width+margin.left+margin.right)
        .attr("height",height+margin.top+margin.bottom)
        
        var gEnter=svg.append("g");
        var mainGroup=svg
        .select("g")
        .attr("transform","translate("+margin.left+","+margin.top+")")
        .attr("stroke","none");

        let getDataByFrequency=d3.group(data,(d)=>d[frequency]);
        console.log(getDataByFrequency);

        let prevYear=0;
        const getTicketAndFormattedValue=(key,val)=>{
            switch(frequency){
                case "date":
                    return dateFormat(val);
                    break;
                case "month":
                    var dateSplit=dateFormat(xValue(key[0])).toString().split(" ");

                    const monthVal=dateSplit[1]==="Jan"
                    ?dateSplit[1]+" "+dateSplit[3]
                    :dateSplit[1];

                    return monthVal;
                    break;
                case "year":
                    var dateSplit=dateFormat(xValue(key[0])).toString().split(" ");
                    return dateSplit[3];
                    break;
                default:
                    break;
            }
        };
        let tickValues=[];
        getDataByFrequency.forEach(function(key,val){
            tickValues.push(getTicketAndFormattedValue(key,val));
        });

        yScale=yScale.domain([0,data.length]).range([0,height]);
        let dataByFormattedDate=[];

        getDataByFrequency.forEach(function(key,val){
            dataByFormattedDate.push({
                date:val,
                formattedDate:getTicketAndFormattedValue(key,val),
            })
        });

        let dataByCategories=d3.group(data,colorValue);

        let categories=[];
        dataByCategories.forEach((k,v)=>{
            categories.push(v)
        })

        categories=categories.sort();

        colorScale=colorScale
        .domain([0,categories.length])
        .range(["#00B9FA","F95002"])
        .interpolate(d3.interpolateHcl);

        //set the x axis tick values
        var xAxis=d3
        .axisBottom()
        .scale(xScale)
        .tickValues(tickValues)
        .tickSize(height,0,0)
        .tickSizeOuter(0)
        .tickFormat((d,i)=>{
            let filterData=dataByFormattedDate.filter((item,index)=>{
                return item && item.formattedDate.toString()==d.toString()
                ?item.date
                :"";
            })
            return filterData[0].date;
        })

        var grid=mainGroup
        .append('g')
        .attr("class","grid")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor","middle")
        .attr("fill","#000")
        .attr("stroke","none")
        .attr("font-size","14px")
        .attr("dy","10px");

        yScale=yScale.domain([0,data.length]).range([0,height]);
        const projectData=data.filter((item)=>item.status);
        var events=mainGroup
        .append("g")
        .selectAll("this_is_empty")
        .data(projectData)
        .enter();

        //label box configuration
        let actualIndex=0;
        let prevIndex=0;
        let y=0;
        let actualindexY=0.1;
        const dataSeriesIndex=[];
        const indexSeries=[];
        var tooltip=d3
        .select("body")
        .append("div")
        .attr("class","tooltip")
        .attr("id","timeline-tooltip")
        .style("opacity",0);

        var innerRects=events.append("rect")
        .attr("rx",20)
        .attr("ry",50)
        .attr("x",(d,i)=>{
            var index=data.findIndex(function(item,ind){
                return item[frequency]===d[frequency];
            })

            indexSeries.push(index);
            if(index!==actualIndex){
                prevIndex=prevIndex+1;
                actualIndex=index;
                dataSeriesIndex.push(prevIndex)
            }else{
                dataSeriesIndex.push(prevIndex);
            }
            let addXval=100;
            return prevIndex*barWidth
        })
        .attr("y",(d,i)=>{
            //for first box of each date
            if(indexSeries[i]!==actualindexY){
                y=height-30;
                prevIndex=prevIndex+1;
                actualIndex=indexSeries[i]
                return y;
            }
            else{
                y=y-barHeight-5;
                return y;
            }
            return yScale(i)
        })
        .attr("fill",(d)=>{
            if(!d.status){
                return "#fff";
            }
        })
        .on("click",(e)=>{
            tooltip.style("opacity",1);
            tooltip.html(
                e.target.__data__.label+
                "</br>"+
                e.description+
                "</br>"+
                "status: "+
                e.status
            )
            .style("left",e.pageX+"px")
            .style("top",e.pageY-28+"px");
        });

        actualIndex=0
        prevIndex=0;
        y=0;
        actualIndex=0.1;

        //for the inside labels
        var rectTexts=events
        .append("text")
        .text((d)=>d.count+" "+d.label)
        .attr("x",(d,i)=>{
            let addXval=55;
            return dataSeriesIndex[i]*barWidth+10+addXval;
        })
        .attr("y",(d,i)=>{
            //Set the text of first box onwards if counted from bottom
            if(indexSeries[i]!==actualIndex){
                y=height-10;
                prevIndex=prevIndex+1;
                actualIndex=indexSeries[i]
                return y;
            }
            //set the text of 2nd box onwards, if counted from the bottom
            else{
                y=y-barHeight-5;
                return y;
            }

        })
        .attr("font-size",14)
        .attr("text-anchor","middle")
        .attr("text-height",30)
        .attr("fill", "#333")
        .attr("style","margin-left:5px");

        //Below code is for the image inside labels
        actualIndex=0;
        prevIndex=0;
        y=0;
        actualIndex=0.1;
        events
        .append("svg:image")
        .attr("xlink:href",(d)=>{
            return images[categories.indexOf(colorValue(d))];
        })
        .attr("height",20)
        .attr("x",(d,i)=>{
            let addXval=0;
            return dataSeriesIndex[i]*barWidth+5+addXval;
        })
        .attr("y",(d,i)=>{
            var index=data.findIndex(function(item,ind){
                return item.date===d.date;
            });
            //set position of image of first box of each date from bottom
            if(indexSeries[i]!==actualindexY){
                y=height-25;
                prevIndex=prevIndex+1;
                actualIndex=indexSeries[i];
                return y;
            }
            //set posiution of 2nd box onwards image from bottom
            else{
                y=y-barHeight-5;
                return y;
            }
        });

        let transform;
        let prevtransform=[];
        //below code is for date line displayed

        svg.selectAll("g.tick")
        .attr("class","tick arc1")
        .attr("transform", function(d,index){
            return "translate("+index*barWidth+","+0+")";
        })
        .call(xScale)
        
     })
    }
    chart.frequency=function(value){
        if(!arguments.length){
            return frequency;
        }
        frequency=value;
        return chart;
    };

    chart.colors=function(value){
        if(!arguments.length){
            return colors;
        }
        colors=value;
        return chart;
    }
    chart.images=function(value){
        if(!arguments.length){
            return images;
        }
        images=value;
        return chart;
    }
    chart.width=function(value){
        if(!arguments.length){
            return width;
        }
        width=value;
        return chart;
    }
    chart.widthByData=function(value){
        if(!arguments.length){
            return width;
        }

       let newBarWidth=
       (d3.select(".timelineContainer").node().getBoundingClientRect().width-margin.left-margin.right)/value;
       if(newBarWidth>barWidth){
        barWidth=newBarWidth;
       }
       width=barWidth*value;
       return chart;
    }
    chart.height=function(value){
        if(!arguments.length){
            return height;
        }
        height=value;
        return chart;
    }
    chart.margin=function(value){
        if(!arguments.length){
            return margin;
        }
        margin=value;
        return chart;
    }
    chart.xScale=function(value){
        if(!arguments.length){
            return xScale;
        }
        xScale=value;
        return chart;
    }
    chart.yScale=function(value){
        if(!arguments.length){
            return yScale;
        }
        yScale=value;
        return chart;
    }
    chart.colorScale=function(value){
        if(!arguments.length){
            return colorScale;
        }
        colorScale=value;
        return chart;
    }
    chart.xValue=function(value){
        if(!arguments.length){
            return xValue;
        }
        xValue=value;
        return chart;
    }
    chart.colorValue=function(value){
        if(!arguments.length){
            return colorValue;
        }
        colorValue=value;
        return chart;
    }
    chart.barHeight=function(value){
        if(!arguments.length){
            return barHeight;
        }
        barHeight=value;
        return chart;
    }
    chart.barWidth=function(value){
        if(!arguments.length){
            return barWidth;
        }
        barWidth=value;
        return chart;
    }
    chart.dateFormat=function(value){
        if(!arguments.length){
            return dateFormat;
        }
        dateFormat=value;
        return chart;
    }
    return chart;
}