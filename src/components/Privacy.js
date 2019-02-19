import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Privacy = (props) => {

    return(
      <div>
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName={props.match.path === '/privacypolicy' ? 'SlideIn' : 'SlideOut'}
        >
          <div className="hero-sm-privacy">
              <div className="row justify-content-center fullview-md">
              </div>
          </div>
          <div className="container fullview">
            <h1 className="font-accent heading-max text-center">Privacy Policy</h1>

            <div className="row">
              <div className="col-lg-12">
                <hr />
                <div class="mgn">

                  <article>The term "VedaIAS", "us", "we", or "our" refer to VedaIAS. The term "you", "your" refers to users and viewers of this site. We are committed to maintain confidentiality, and security of all personal identifiable information of our customers. This document describes our system to protect customers’ information.</article>
                  <article>By accessing our website, you agree to the terms of this Privacy Policy. We reserve the right to change the Privacy Policy and suggest you to continue referring to this policy on our website. If you do not agree with our policy you are not authorised to access our website and use our services.</article>
                  <br />

                  <h2>Information Sharing</h2>
                  <br />
                  <article>We do not share, sell, trade, or transfer your personal information to third parties. However, some of your performance may be visible to other registered users of the site but it will not include personal information. We may release your information only when we believe this is appropriate as per the law.</article>
                  <br />

                  <h2>Information Confidentiality</h2>
                  <br />
                  <article>You are responsible for keeping log-in information such as user name, email ID and password, confidential. You should not share these credentials to any third party. If you believe that your confidential information is stolen, you must inform us at <a href="mailto:info@VedaIAS.com" title="info@VedaIAS.com">info@VedaIAS.com</a> and you should change your password immediately. We are not responsible if someone accesses your account through a violation by you of this Privacy Policy.</article>
                  <br />

                  <h2>Use of Personal Information by VedaIAS </h2>
                  <br />
                  <article>We collect information such as name, e-mail ID, mailing address, phone number, location, etc. If you are paying online we collect card details and other payment related information. We may also collect technical and navigational information, such as computer browser type, Internet protocol address along with other data that browsers send when you land on our site, pages visited, and average time spent on the site. We collect your information for any of the information purpose:

                  <p>✔ To provide you personalise guidance and recommendation</p>
                  <p>✔ To improve the learning experience at VedaIAS </p>
                  <p>✔ To send you alerts and updates through emails or sms</p>

                  </article>
                  <br />

                  <h2>Information Security</h2>
                  <br />
                  <article>We use a combination of firewall barriers, encryption techniques and authentication procedures, among others, to maintain the security of your information. We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</article>
                  <br />
                  <article>This online privacy policy applies only to information collected through our website and not to information collected offline.</article>
                  <br />
                  <article>By registering on VedaIAS , you consent to our above mentioned privacy policy. For any querries, please contact us at <b>info@VedaIAS.com</b> with "Privacy Policy" in the subject line.</article>


                </div>
                <hr />
              </div>

            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
}

Privacy.propTypes = {

}

export default Privacy;
