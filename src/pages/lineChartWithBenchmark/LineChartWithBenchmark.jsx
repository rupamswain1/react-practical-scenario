import React from 'react'
import {ResponsiveLine} from "@nivo/line";
import {area} from "d3-shape";
const LineChartWithBenchmark = () => {
  const data=[
    {
        id:1,
        data:[
            {x:"x1",
            y:40,
            y2:70},
            {
                x:"x2",
                y:70,
                y2:70
            },
            {
                x:"x3",
                y:80,
                y2:70
            },
            {
                x:"x4",
                y:20,
                y2:70
            }
        ]
    }
  ];

  const Area=({data,xScale,yScale,height,points})=>{
    const areaGenerator=area()
    .x((points)=>{
        return xScale(points.data.x);
    })
    .y0(()=>{
        return height-100;
    })
    .y1((points)=>{
        return yScale(points.data.y2)
    });
    return(
        <path
            d={areaGenerator(points)}
            fill={"#acf4da"}
            style={{mixBlendMode:"multiply",pointerEvents:"none"}}
            opacity={0.5}
        />
    )
  }
    return (

    <div style={{width:"100%",height:'500px'}}>
 <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        layers={[
            "grid",
            "markers",
            "axes",
            Area,
            "crosshair",
            "lines",
            "points",
            "slices",
            "mesh",
            "legends"
        ]}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
  )
}

export default LineChartWithBenchmark