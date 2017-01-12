import React from 'react'

export default class Flash extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      color: this.props.color,
      animate: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.color !== nextProps.color) {
      this.setState({
        color: nextProps.color,
        animate: false
      });

      setTimeout(() => this.setState({ animate: true }), 10);
    }
  }
  
  render() {
    const { animate, color } = this.state;

    return (
      <div className={animate ? 'flash' : ''} style={{ background: color }}>
      </div>
    )
  }
}