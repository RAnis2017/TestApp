import React, { Component, PropTypes } from 'react';

export default class Timer extends Component {
  constructor(props) {
      super(props);

      this.state = {
       running: true,
       hours: 2,
       mins: 59,
       secs: 50,
       ogTime: this.props.ogTime,
     };
   }

  componentDidMount() {
    this.interval = setInterval(this.onTick,1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStart = () => {
    this.setState({
      running: true,
    });
  };

  onStop = () => {
    this.setState({
      running: false,
    });
  };

  onReset = () => {
    this.setState({
      elapsedTime: 0,
    });
  };

  onTick = () => {
    if (this.state.running) {
      var now = Date.now();
      if(this.state.secs < 59){
        this.setState({ secs: this.state.secs + 1 });
      } else {
        if(this.state.mins < 59){
          this.setState({ secs: 0, mins: this.state.mins + 1 });
        } else {
           this.setState({ mins: 0, secs: 0, hours: this.state.hours + 1 });
           if(this.state.hours >= this.state.ogTime){
             this.props.timeOver(this.props.courseId);
             this.setState({ running: false });
           }
        }
      }
    }
  };

  render() {
    return (
      <div className="timer">
        <h3>{`${this.state.hours+":"+this.state.mins+":"+this.state.secs}`}</h3>
        <h5>Total Time is {this.state.ogTime} Hours</h5>
      </div>
    );
  }
}
