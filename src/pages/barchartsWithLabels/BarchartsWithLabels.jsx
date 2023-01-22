import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
const BarchartsWithLabels = () => {
const data=[
    {
    "id":0,
      "country": "AD",
      "hot dog": 164,
      "hot dogColor": "hsl(79, 70%, 50%)",
      "burger": 144,
    
    },
    {"id":1,
      "country": "AE",
      "hot dog": 0,
      "hot dogColor": "hsl(231, 70%, 50%)",
      "burger": 17,
   
    },
    {"id":2,
      "country": "AF",
      "hot dog": 89,
      "hot dogColor": "hsl(66, 70%, 50%)",
      "burger": 154,
     
    },
    {"id":3,
      "country": "AG",
      "hot dog": 22,
      "hot dogColor": "hsl(288, 70%, 50%)",
      "burger": 151,
    
    },
    {"id":4,
      "country": "AI",
      "hot dog": 49,
      "hot dogColor": "hsl(238, 70%, 50%)",
      "burger": 200,
      
    },
    {"id":5,
      "country": "AL",
      "hot dog": 78,
      "hot dogColor": "hsl(352, 70%, 50%)",
      "burger": 14,
      
    },
    {"id":6,
      "country": "AM",
      "hot dog": 180,
      "hot dogColor": "hsl(49, 70%, 50%)",
      "burger": 44,
      
    }
  ]

  const Line=({bars,xScale,yScale})=>{
    const labelMargin=20 //space btween top of the stacked bars and total labels

    return bars.map(({data:{id,data,indexValue},x,y,width},i)=>{
        //sum of all bar values in a stacked bar
        let labelValue=data[id];
        labelValue=labelValue!=null && labelValue!=undefined ? labelValue:0;
        return(
            <g 
                transform={`translate(${x},${y-20})`}
                key={`${indexValue}-${i}`}
            >
                    <text
                        //add any class label here
                        className="bar-total-labels"
                        x={width/2}
                        y={labelMargin/2}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        style={{fill:"rgb(51,51,51"}}
                    >
                        {labelValue+"%"}
                    </text>
            </g>
        )
    })
  }

  const yAxisBar=()=>{
    return (
        <line x1="0" y1="0"  y2="500" strokeWidth={1} stroke="grey"></line>
    )
  }
  const xAxisBar=(data)=>{
    const {width}=data;
    return (
        <line x1="-10" y1="400" x2={width} y2="400" strokeWidth={1} stroke="grey"></line>
    )
  }

  return <div style={{ height: '500px', width: '100%' }}>
    <ResponsiveBar
        data={data}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderRadius={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        layers={[
            "grid",
            "axes",
            "bars",
            "area",
            Line,
            "markers",
            "legends",
            yAxisBar,
            xAxisBar
        ]}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
  </div>;
};

export default BarchartsWithLabels;
