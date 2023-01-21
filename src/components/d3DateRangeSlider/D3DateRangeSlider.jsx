import React, { Component } from 'react'
import {createD3RangeSlider} from "./d3RangeSlider"
import './D3RangeSlider.css'
export class D3DateRangeSlider extends Component {
  constructor(props){
    super(props);
    this.sliderRef=React.createRef();
    this.rangeRef=React.createRef();
  }

//Required
//startingRange-start range of slider
//endingRange-end range of slider
//minRange-minimum selected range
//maxRange-maximum selected range
//onChange-provides the changed values
//sliderRefText-dev slider reference

componentDidMount(){
    const slider=this.createSlider();
    slider.onChange((newRange)=>{
        this.props.onChange(newRange);
    })
}

createSlider(){
    const slider=createD3RangeSlider(this.props.startingRange,this.props.endingRange,"#container",false)
    slider.range(this.props.minRange,this.props.maxRange)
    return slider;
}

  render() {
    return (
      <div classname="container">
        <div classname="section">
            <div id="container">

            </div>
            <div id="range-label" style={{display:`${this.props.sliderRefText?true:false}`}}>
                Lower Range: {this.props.minRange} max Range:{this.props.maxRange}
            </div>
        </div>
    </div>
    )
  }
}

export default D3DateRangeSlider;