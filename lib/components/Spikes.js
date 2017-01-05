import React , { Component } from 'react';
import firebase from '../firebase';
import { map, uniq } from 'lodash';
import Spike from './Spike';


export default class Spikes extends Component {
  constructor(props) {
    super();
    this.state = {
      dateFilter: 'all'
    };
  }

  filterSpikes(spikes) {
    const { updateCount, user } = this.props;
    const { dateFilter } = this.state
    return map(spikes, (spike) => {
      if(spike.appr) {
        if(dateFilter === 'all' || dateFilter === spike.spikeDate) {
          return (
            <Spike
              spike={spike}
              key={spike.key}
              updateCount={updateCount}
              user={user}
            />
          )
        }
      }
    })
  }

  dateOptions(spikes) {
    let dates = uniq(map(spikes, (spike) => spike.spikeDate)).sort((a,b) => {
      a = a.split('-').join('');
      b = b.split('-').join('');
      return a > b ? 1 : a < b ? -1 : 0;
    })
    return map(dates, (date, index) => {
      return <option key={index} value={date}>{date}</option>
    })
  }

  render() {
    const { spikes } = this.props

    let allSpikes = this.filterSpikes(spikes)

    let allDateOptions = this.dateOptions(spikes)

    return (
      <section>
        <select name="all" onChange={(e)=>this.setState({ dateFilter: e.target.value })}>
          <option value="all">All Dates</option>
          {allDateOptions}
        </select>
        <h1 className="SpikesTitle">Student-Led Spikes</h1>
        <section className="AllSpikes">{allSpikes}</section>
      </section>
    )
  }
}
