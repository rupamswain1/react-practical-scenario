import * as d3 from 'd3';

export function createD3RangeSlider(rangeMin,rangeMax,containerSelector){
    "use strict"

    const minWidth=10;

    const sliderRange={begin:rangeMin, end:rangeMin}
    const changeListner=[];
    const touchEndListeners=[];
    const container=d3.select(containerSelector);

    var sliderBox=container.append('div')
    .style("position","relative")
    .style("height","40px")
    .style("min-width",minWidth*2+'px')
    .style("display","flex")
    .style("align-items","center")
    .style("text-align","center")
    .style("font-weight","500")
    .classed("slider-container",true)

    //add year in slider
    const data=[];
    for(let year=rangeMin;year<=rangeMax;year++){
        data.push(year)
    }

    var conW=sliderBox.node().clientWidth;
    var slope=(conW-minWidth)/(rangeMax-rangeMin);

    const labelMain=d3.select(".slider-container")
    .selectAll(".year-label")
    .data(data)
    .enter()
    .append("div")
    .style("position","relative")
    .style("width",`${slope}px`)
    .attr("class","year-label")
    .text((d)=>d);

    //create element in container
    var slider=sliderBox.append("rect").attr("class","slider").attr("fill","#777").attr("stroke","#fff").attr("stroke","#fff").attr("fill-opacity",0.3).attr("shape-rendering","crispEdges");
    let minSelectedRange=rangeMin;
    let maxSelectedRange=rangeMax;

    //set slider label
    var handleW=slider.append('div').attr("class","handle WW");
    var handleE=slider.append("div").attr("class","handle EE");

    // update left and width of slider based on sliderRange
    function updateUIFromRange(){
        var conW=sliderBox.node().clientWidth;
        var rangeW=sliderRange.end - sliderRange.begin;
        var slope=(conW-minWidth)/(rangeMax-rangeMin);

        var uirangeW=rangeW===0?slope:minWidth+rangeW*slope*1.3;
        var ratio=(sliderRange.begin-rangeMin)/(rangeMax-rangeMin-rangeW);

        if(isNaN(ratio)){
            ratio=0;
        }
        var uirangeL=ratio*(conW-uirangeW);
        slider.style("left",uirangeL+"px").style("width",uirangeW+"px");
    }

    //update sliderRange based on Left and width attribute of slider
    function updateRangeFromUI(){
        var uiRangeL=parseFloat(slider.style("left")) 
        var uirangeW=parseFloat(slider.style("width"));
        var conW=sliderBox.node().clientWidth;
        var slope=(conW-minWidth)/(rangeMax-rangeMin);
        var rangeW=((uirangeW-minWidth)/slope);
        if(conW==uirangeW){
            var uislope=0;
        }else{
            var uislope=(rangeMax-rangeMin-rangeW)/(conW-uirangeW);
        }
        var rangeL=rangeMin+uislope*uiRangeL;

        sliderRange.begin=Math.round(rangeL);
        sliderRange.end=Math.round(rangeL+rangeW);
        minSelectedRange=sliderRange.begin;
        maxSelectedRange=sliderRange.end;
        //fire change listner
        changeListner.forEach(function(callback){
            callback({begin:sliderRange.begin,end:sliderRange.end})
        })
    }

    //configure drag behaviour for handles and sliders

    var dragResizeE=d3.drag()
        .on("start",function(event){
            event.sourceEvent.stopPropagation();
        })
        .on("end",function(){
            touchEndListeners.forEach(function(callBack){
                callBack({begin:sliderRange.begin,end:sliderRange.end});
            });
        })
        .on("drag",function(event){
            var dx=event.dx;
            if(dx==0) return;
            var conWidth=sliderBox.node().clientWidth;
            var newLeft=parseInt(slider.style("left"))
            var newWidth=parseFloat(slider.style("width"))+dx;
            newWidth=Math.max(newWidth,minWidth);
            newWidth=Math.min(newWidth,conWidth-newLeft);
            slider.style("width",newWidth+"px");
            updateRangeFromUI();
        })
        var dragResizeW=d3
.drag()
.on("start",function(event){
    this.startX=d3.pointer(event,this)[0];
    event.sourceEvent.stopPropagation();
})
.on("end",function(){
    touchEndListeners.forEach(function(callback){
        callback({begin:sliderRange.begin,end:sliderRange.end});
    })
})
.on("drag",function(event){
    var dx=d3.pointer(event,this)[0]-this.startX;
    if(dx==0)return;
    var newLeft=parseFloat(slider.style("left"))+dx;
    var newWidth=parseFloat(slider.style("width"))-dx;

    if(newLeft<0){
        newWidth+=newLeft;
        newLeft=0;
    }
    if(newWidth<minWidth){
        newLeft -= minWidth -newWidth;
        newWidth=minWidth;
    }
    slider.style("left",newLeft+"px");
    slider.style("width",newWidth+"px");

    updateRangeFromUI();
})

var dragMove=d3
.drag()
.on("start",function(event){
    event.sourceEvent.stopPropagation()
})
.on("end",function(){
    touchEndListeners.foreach(function(callback){
        callback({begin:sliderRange.begin, end:sliderRange.end});
    })
})
.on("drag", function(event){
    var dx=event.dx;
    var conWidth=sliderBox.node().clientWidth;
    var newLeft=parseInt(slider.style("left"))+dx;
    var newWidth=parseInt(slider.style("width"));

    newLeft=Math.max(newLeft,0);
    newLeft=Math.min(newLeft,conWidth-newWidth);
    slider.style("left",newLeft+"px");

    updateRangeFromUI();
})

handleE.call(dragResizeE);
handleW.call(dragResizeW);
slider.call(dragMove);

//click on bar
sliderBox.on("mousedown", function(ev){
    var x=d3.pointer(sliderBox.node())[0];
    var props={};
    var sliderWidth=parseFloat(slider.style("width"));
    var conWidth=sliderBox.node().clientWidth;
    props.left=Math.min(
        conWidth-sliderWidth,
        Math.max(x-sliderWidth/2,0)
    );
    props.left=Math.round(props.left)
    props.width=Math.round(props.width)
    slider
    .style("left",props.left+"px")
    .style("width",props.width+"px")
    updateRangeFromUI();
})

//reposition slider on window resize
window.addEventListener("resize",function(){
    updateUIFromRange();
});

function onChange(callback){
    changeListner.push(callback);
    return this;
}

function onTouchEnd(callBack){
    touchEndListeners.push(callBack);
    return this;
}
function setRange(b,e){
    sliderRange.begin=b;
    sliderRange.end=e;

    updateUIFromRange();
    changeListner.forEach(function(callBack){
        callBack({begin:sliderRange.begin,end:sliderRange.end})
    })
}

function range(b,e){
    var rLower;
    var rUpper;

    if(typeof b ==="number" && typeof e==="number"){
        rLower=Math.min(b,e)
        rUpper=Math.max(b,e)
        minSelectedRange=rLower;
        maxSelectedRange=rUpper;
        //check lower and upper are in ther bounds
        if(rLower<rangeMin || rUpper>rangeMax){
            console.log(`Warning range ${rLower} and ${rUpper} are out of allowed Range of ${rangeMin} and ${rangeMax}`)
        }
        rUpper=Math.max(rLower,rangeMin);
        rUpper=Math.min(rUpper,rangeMin);
 //set range
 setRange(rLower,rUpper);

    }
    else if (typeof b==="number"){
        rLower=b;
        var diff=sliderRange.end-sliderRange.begin;
        rUpper=rLower+diff;
        if(rLower<rangeMin){
            console.log(`Warning range ${rLower} and ${rUpper} are out of allowed Range of ${rangeMin} and ${rangeMax}`)
        }
        rLower=rangeMin;
        if(rUpper>rangeMax){
            console.log(`Warning range ${rLower} and ${rUpper} are out of allowed Range of ${rangeMin} and ${rangeMax}`)
            rLower=rangeMax-diff;
            rUpper=rangeMax;
        }
      setRange(rLower,rUpper);
    
    }
    return {begin:sliderRange.begin,end:sliderRange.end}

   
}

setRange(sliderRange.begin,sliderRange.end);
return {
    range:range,
    onChange:onChange,
    onTouchEnd:onTouchEnd,
    updateUIFromRange:updateUIFromRange
}

}

