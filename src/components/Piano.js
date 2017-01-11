import React from 'react'; 
import connect from '../api'; 
import { getRandomNote, getRandomColor } from '../utils'

export default class extends React.Component {

  constructor(props) {
    super(props); 

    this.events = ['touchstart', 'mousedown']; 
    this.state = {
      color: '#353535',
      animate: true
    };
  }

  signalNote = () => {
    const color = getRandomColor();
    this.api.emit('note', {note: getRandomNote(), color });
    this.setState({ color , animate: false });
    setTimeout(() => this.setState({animate: true }), 1);
  }

  componentWillMount() {
    this.api = connect('piano');
    this.events.forEach(evt => window.addEventListener(evt, this.signalNote)); 
  }

  componentWillUnmount() {
    this.events.forEach(evt => window.removeEventListener(evt, this.signalNote)); 
  }
  
  render() {
    return (
      <div className="piano">
        <div className={this.state.animate ? 'flash': ''} style={{background: this.state.color}}>
        </div>
      </div>
    )
  }
}