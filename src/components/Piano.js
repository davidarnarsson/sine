import React from 'react'; 
import connect from '../api'; 
import { getRandomNote, getRandomColor } from '../utils'
import Flash from './Flash'

export default class extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      color: '#353535'
    };
  }

  signalNote = () => {
    const color = getRandomColor();
    this.api.emit('note', {note: getRandomNote(), color });
    this.setState({ color });    
  }

  componentWillMount() {
    this.api = connect('piano');
    ['touchstart', 'mousedown'].forEach(evt => window.addEventListener(evt, this.signalNote)); 
  }

  componentWillUnmount() {
    ['touchstart', 'mousedown'].forEach(evt => window.removeEventListener(evt, this.signalNote)); 
  }
  
  render() {
    return (
      <div className="piano">
        <Flash color={this.state.color} />
      </div>
    )
  }
}