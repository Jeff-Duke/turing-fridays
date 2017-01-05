import React , { Component } from 'react';
import firebase from '../firebase';
import { map } from 'lodash';
import Spike from './Spike';


export default class Spikes extends Component {
  constructor(props) {
    super();
    this.state = {
      dateFilter: 'all'
    };
  }

  componentDidMount() {
    this.setState({ dateFilter: Date.now() });
  }

  filterSpikes(spikes) {
    const { updateCount, user } = this.props;
    const { dateFilter } = this.state
    return map(spikes, (spike) => {
      if(spike.appr) {
          if(spike.spikeDate > dateFilter - 86400000  && spike.spikeDate < dateFilter + 604800000) {
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

  render() {
    const { spikes, dateOptions } = this.props

    let allSpikes = this.filterSpikes(spikes)

    let allDateOptions = dateOptions(spikes)

    return (
      <section>
        <select name="all" onChange={(e)=>this.setState({ dateFilter: parseInt(e.target.value) })
          }>
          <option value={Date.now()}>Current Week</option>
          {allDateOptions}
        </select>
        <h1 className="SpikesTitle">Student-Led Spikes</h1>
        <section className="AllSpikes">{allSpikes}</section>
      </section>
    )
  }
}
