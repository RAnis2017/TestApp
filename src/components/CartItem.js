import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'

const Item = (props) => {
    const { dispatch } = props;

    return(
          <Link className="cartItemLink" to="/">
            <div className="row m-auto">
              <div className="col-sm-3">
                <img src="https://gs-post-images.grdp.co/2018/6/gate-img1529910709846-84.png-rs-high-webp.png" className="cartImg" />
              </div>
              <div className="col-sm-5">
                <p>Course Name - Course Price</p>
              </div>
              <div className="col-sm-4">
                <button className="btn btn-danger">Remove</button>
              </div>
            </div>
          </Link>
        );
}

Item.propTypes = {
}

const mapStateToProps = state => (
  {
  }
);

export default connect(mapStateToProps)(Item);
