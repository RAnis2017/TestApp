import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Contact = (props) => {

    return(
      <div>
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName={props.match.path === '/contact' ? 'SlideIn' : 'SlideOut'}
        >
          <div className="hero-sm-contact">
              <div className="row justify-content-center fullview-md">
              </div>
          </div>
          <div className="container fullview">
            <h1 className="font-primary text-center">Want to know more about us? Or have something to ask? <br /> Contact Us Now & We'll get in touch as soon as possible!</h1>

            <div className="row">
              <div className="col-lg-12">
                <hr />
                <h1 className="font-secondary text-center">Get in touch</h1>
                <hr />
              </div>
              <div className="col-lg-12">
              <form className="" action="https://formspree.io/razaanis123@gmail.com" method="POST">
                <div className="row">
                  <div className="col-sm-12 col-lg-4">
                    <label className="sr-only" for="name">Name</label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fas fa-user font-accent"></i></div>
                      </div>
                      <input type="text" className="form-control" id="name" placeholder="name" name="name" />
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-4">
                    <label className="sr-only" for="phone">Phone</label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fas fa-phone font-accent"></i></div>
                      </div>
                      <input type="text" className="form-control" id="phone" placeholder="phone" name="phone" />
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-4">
                    <label className="sr-only" for="email">Email</label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fas fa-at font-accent"></i></div>
                      </div>
                      <input type="text" className="form-control" id="email" placeholder="email" name="email" />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-lg-12">
                    <label className="sr-only" for="message">Your message</label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fas fa-envelope font-accent"></i></div>
                      </div>
                      <textarea className="form-control" id="message" placeholder="Your message" rows="12" name="message"></textarea>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary float-right">Send</button>
              </form>
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
}

Contact.propTypes = {

}

export default Contact;
