import React from 'react'; 
import connect from '../api'; 
import { getRandomNote, getRandomColor, calculateNote, pentatonicScale } from '../utils'
import Flash from './Flash'
import Keys from './Keys'

export default class extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      color: '#353535',
      hammers: []
    };
  }

  signalNote = (id, note = getRandomNote()) => {
    const color = getRandomColor();
    this.api.emit('note', { note, color, id });
    this.setState({ color });    
  }

  onHammers = (h) => {    
    this.setState({ hammers: h })
  }

  onHammerName = (hn) => {
    let { hammers } = this.state
    hammers.find(x => x.id === hn.id).name = hn.name
    this.setState({ hammers });
  }

  onNewHammer = (nh) => {
    let { hammers } = this.state
    hammers = [...hammers, nh];
    this.setState({ hammers })
  }

  onTriggerKey = (k, name, index) => {
    const scale = pentatonicScale

    const step = scale[index % scale.length]; // + (Math.floor(index / scale.length) * scale[scale.length - 1])
    
    this.signalNote(k, calculateNote(164.81, step + 12))
  }

  onHammerDisconnect = (h) => {
    let { hammers } = this.state
    let idx = hammers.findIndex(x => x.id == h.id);
    hammers = [...hammers.slice(0, idx), ...hammers.slice(idx + 1, hammers.length)]
    this.setState({ hammers })
  }

  componentWillMount() {
    this.api = connect('piano')
      .on('hammers', this.onHammers)
      .on('new-hammer', this.onNewHammer)
      .on('hammer-name', this.onHammerName)
      .on('hammer-disconnect', this.onHammerDisconnect);
  }

  componentDidMount() {
    ['touchstart', 'mousedown'].forEach(evt => this.allTrigger.addEventListener(evt, _ => this.signalNote())); 
  }

  componentWillUnmount() {
    ['touchstart', 'mousedown'].forEach(evt => this.allTrigger.removeEventListener(evt, _ => this.signalNote())); 
  }
  
  render() {
    return (
      <div className="piano" >
        <Flash color={this.state.color} />
        <div className="all-trigger" ref={at => this.allTrigger = at}>
        </div>  
        <Keys keys={this.state.hammers} onTriggerKey={this.onTriggerKey} />   
      </div>
    )
  }
}