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

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

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
  "data": [
    {
      "label": "Test # 1",
      "value": "80"
    },
    {
      "label": "Test # 2",
      "value": "22"
    },
    {
      "label": "Test # 3",
      "value": "62"
    },
    {
      "label": "Test # 4",
      "value": "90"
    },
    {
      "label": "Test # 5",
      "value": "100"
    }
  ]
};


const UserPerformance = (props) => {
    const { dispatch, loggedInUser } = props;
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
}

const mapStateToProps = state => (
  {
  }
);

export default connect(mapStateToProps)(UserPerformance);
