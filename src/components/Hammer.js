import React from 'react';
import connect from '../api'
import Synth from '../synth'
import Flash from './Flash'

export default class extends React.Component {

  constructor(props) {
    super(props);

    this.synth = new Synth('sine');
    this.api = connect('hammer');
    this.state = {
      note: 0,
      color: '#343434'
    };
  }

  componentWillMount() {
    this.api.on('note', msg => {
      this.synth.play(msg.note);

      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      
      this.api.emit('playing', { playing: true }); 
      
      this.timeoutId = setTimeout(() => this.api.emit('playing', { playing: false }), 2000); 

      this.setState({ color: msg.color });
    });
  }

  unlockAudioContext = () => {
    this.synth.unlock();
  }
  
  componentDidMount() {
    this.nameInput.focus();
    ['touchstart', 'mousedown'].forEach(e => this.hammerElm.addEventListener(e, this.unlockAudioContext));
  }
  
  componentWillUnmount() {
    this.api.disconnect();
    ['touchstart', 'mousedown'].forEach(e => this.hammerElm.removeEventListener(e, this.unlockAudioContext));
  }

  onNameChange = (e) => {
    this.api.emit('name', { name: e.target.value })
  }
  
  render() {
    return (
      <div ref={r => this.hammerElm = r} className="hammer">
        <Flash color={this.state.color} />

        <input ref={r => this.nameInput = r} maxLength="16" className="input-name" onChange={this.onNameChange} placeholder="Hvað heitirðu?" />
      </div>
      );
  }
}