
import D3DateRangeSlider from '../../components/d3DateRangeSlider/D3DateRangeSlider'
import React, { Component } from 'react'

export class D3DateRange extends Component {
  constructor(props){
    super(props)
    this.state={
      minRange:2004,
      maxRange:2006
    }
  }
  render() {
    return (
      <div>
        <D3DateRangeSlider
          startingRange={1995}
          endingRange={2022}
          minRange={this.state.minRange}
          maxRange={this.state.maxRange}
          onChange={(newRange)=>this.setState({minRange:newRange.begin, maxRange:newRange.end})}
          sliderRefText={true}
        />
      </div>
    )
  }
}

export default D3DateRange