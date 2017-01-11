import React from 'react';
import connect from '../api'
import Synth from '../synth'

export default class extends React.Component {

  constructor(props) {
    super(props);

    this.synth = new Synth('sine');
    this.api = connect('hammer');
    this.state = {
      note: 0,
      animate: true,
      color: '#343434'
    };
  }

  componentWillMount() {
    this.api.on('note', msg => {
      console.log(msg)

      this.synth.play(msg.note);

      this.setState({ color: msg.color , animate: false });
      setTimeout(() => this.setState({animate: true }), 1);
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
    this.hammerElm.addEventListener('touchstart', this.enterFullScreen);
    this.hammerElm.addEventListener('mousedown', this.enterFullScreen);

  }
  

  componentWillUnmount() {
    this.api.disconnect();
  }

  render() {
    return (<div ref={r => this.hammerElm = r} className="hammer">
      <div className={this.state.animate ? 'flash': ''} style={{background: this.state.color}}>
      </div>
    </div>);

  }
}