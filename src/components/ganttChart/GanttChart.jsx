import React, { Component } from 'react'
import * as d3 from 'd3';

import {ganttChartLogic} from './ganttChartLogic'

export class GanttChart extends Component {
  constructor(props){
    super(props);
    this.ganttref=React.createRef();
    this.scrollRef=React.createRef();
    this.createGantt=this.createGantt.bind(this);
  }

  componentDidMount(){
    this.createGantt();
  }

  componentDidUpdate(prevprops){
    if(this.props.frequency!=prevprops.frequency)
    {
        d3.select("#ganttChart").select("svg").remove();
        d3.select("#timeline-tooltip").remove()
        this.createGantt();
    }
  }

  //required props frequenct,data.images,colors

  createGantt(){
    var chart=ganttChartLogic()
    .frequency(this.props.frequency)
    .colors(this.props.colors)
    .images(this.props.images)
    .widthByData(d3.group(this.props.data.events,(d)=>d[this.props.frequency]).size)
    .height(300);

    d3.select("#ganttChart")
    .datum(this.props.data.events)
    .call(chart);
  }

  scrollChart(offset){
    if(this.scrollRef.current.scrollRef!=undefined){
        this.scrollRef.current.scrollLeft+=offset;
    }
  }

  render() {
    return (
      <>
        <div
            className="row overflow-x-auto timelineContainer"
            ref={this.scrollRef}
        >
            <div ref={this.ganttref} id="ganttChart"></div>
        
        </div>
        <div className="scroll-right-btn" onClick={()=>this.scrollChart(40)}>
            &#8250;
        </div>
        <div className="scroll-left-btn" onClick={()=>this.scrollChart(-40)}>
            &#8249;
        </div>
      </>
    )
  }
}

export default GanttChart