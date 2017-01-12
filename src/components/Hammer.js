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
      this.setState({ color: msg.color });
    });
  }

  enterFullScreen = () => {
    const { webkitRequestFullScreen, webkitRequestFullscreen, mozRequestFullScreen, msRequestFullscreen} = this.hammerElm
    const requestFullscreen = webkitRequestFullscreen || webkitRequestFullScreen || mozRequestFullScreen || msRequestFullscreen;

    if (requestFullscreen) {
      requestFullscreen.call(this.hammerElm);
    }
  }

  componentDidMount() {
    ['touchstart', 'mousedown'].forEach(e => this.hammerElm.addEventListener(e, this.enterFullScreen));
  }
  

  componentWillUnmount() {
    this.api.disconnect();
    ['touchstart', 'mousedown'].forEach(e => this.hammerElm.removeEventListener(e, this.enterFullScreen));
  }

  render() {
    return (
      <div ref={r => this.hammerElm = r} className="hammer">
        <Flash color={this.state.color} />
      </div>
      );
  }
}