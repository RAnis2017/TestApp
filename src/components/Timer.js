import React, { Component, PropTypes } from 'react';
import axios from "axios";
import {store} from '../Store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';

class Timer extends Component {
  constructor(props) {
      super(props);


      this.state = {
       running: true,
       hours: 0,
       mins: 0,
       secs: 0,
       ogTime: 0,
     };
   }

  componentDidMount() {
    this.interval = setInterval(this.onTick,1000);
    this.loadData();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  loadData = () => {
    let hours;
    let mins;
    let secs;
    let ogTime;

    this.props.loggedInUser.courses.map((outerCourse,index) => {
      outerCourse.tests.map((course,index) => {

        if(course.path === this.props.path){
          hours = course.hours;
          mins = course.mins;
          secs = course.secs;
          ogTime = course.duration;
          this.setState({...this.state, hours, mins, secs, ogTime});
          console.log(this.state);

        }
      })
    });
  };
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
    const { dispatch, apiUrl, loggedInUser } = this.props;
    const loadLoggedInUser = bindActionCreators(InterfaceActionCreators.loadLoggedInUser, dispatch);

    if (this.state.running) {
      var now = Date.now();
      if(this.state.secs < 59){
        this.setState({ secs: this.state.secs + 1 });
        axios
          .post(`${apiUrl}saveUserState`, {
            data: JSON.stringify({
              token: localStorage.getItem('genhex-auth-token'),
              user: {...loggedInUser, nextPath: this.props.path},
            })
          })
          .then(response => {
            console.log(response);
          });
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

const mapStateToProps = state => (
  {
    apiUrl: state.apiUrl,
    loggedInUser: state.loggedInUser,
  }
);

export default connect(mapStateToProps)(Timer);
