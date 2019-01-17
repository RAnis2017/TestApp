import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


const UserPerformance = (props) => {
    const { dispatch, loggedInUser } = props;
    const data = [];
    loggedInUser.courses.map((outerCourse,index) => {
      outerCourse.tests.map((course,index) => {
        data.push({"label":course.name,"value":`${course.lastScore}`});
      });
    });
    const dataSource = {
      "chart": {
        "caption": "Your Performance all the tests",
        "subcaption": "",
        "theme": "candy",
        "yaxisname": "Marks Obtained",
        "syaxisname": "Tests",
        "decimals": "1",
        "drawcrossline": "1"
      },
      "data": data
    };
    const chartConfigs = {
      type: "pareto2d",
      width: '100%',
      height: props.height,
      dataFormat: "JSON",
      dataSource: dataSource
    };
    return(
      <div className="tab-body">
          <ReactFC className="performanceChart" {...chartConfigs} />
      </div>
    );
}

UserPerformance.propTypes = {
  loggedInUser: PropTypes.object.isRequired
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser
  }
);

export default connect(mapStateToProps)(UserPerformance);
