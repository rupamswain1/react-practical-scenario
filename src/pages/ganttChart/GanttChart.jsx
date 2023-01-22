import React, { Component } from 'react';
import GanttChart from '../../components/ganttChart/GanttChart';
export class GanttChartMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: 'date',
      title: 'Daily',
    };
  }
  menuitems = ['Daily', 'Monthly', 'Yearly']; //provide this data to dropdown
  menuItemKeys = ['date', 'month', 'year'];

  images = ['a.png', 'p.png', 'c.png']; //should be in ascending order of status in data.events

  colors = ['#ffe7e7', '#92E3C5', '#d8d1f6']; //ahould be in ascending order
  data = {
    //frequency: this.props.frequency, //month,date,year
    events: [
      {
        date: '14/6/2017',
        month: 'Jun 2017',
        year: '2017',
        count: 5,
        label: 'Conditions',
        status: 'conditions',
        data: ['A', 'B', 'C'],
      },
      {
        date: '14/6/2017',
        month: 'Jun 2017',
        year: '2017',
        count: 5,
        label: 'Op Visits',
        status: 'opVisits',
        data: ['A', 'B', 'C'],
      },
      {
        date: '15/6/2017',
        month: 'Jun 2017',
        year: '2017',
        count: 5,
        label: 'Medications',
        status: 'medication',
        data: ['A', 'B', 'C'],
      },
      {
        date: '15/6/2017',
        month: 'Jun 2017',
        year: '2017',
        count: 1,
        label: 'Op Visits',
        status: 'opVisits',
        data: ['A', 'B', 'C'],
      },
      {
        date: '15/7/2017',
        month: 'Jul 2017',
        year: '2017',
        count: 1,
        label: 'Op Visits',
        status: 'opVisits',
        data: ['A', 'B', 'C'],
      },
    ],
  };

  render() {
    return (
      <div>
        <GanttChart
          frequency={this.state.frequency}
          data={this.data}
          colors={this.colors}
          images={this.images}
        />
      </div>
    );
  }
}

export default GanttChartMain;
