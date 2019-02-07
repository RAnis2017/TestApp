import React from 'react';

export default class AdComponent extends React.Component {

    constructor(props) {
          super(props);
          this.state = {
        curTime : null
      }
      let interval;

    }
    componentDidMount() {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      this.interval = setInterval( () => {
        this.setState({
          curTime : new Date().toLocaleString()
        })
      },30000)
    }
    componentWillUnmount(){
      clearInterval(this.interval);
    }
    render () {
        return (
            <ins className='adsbygoogle'
              style={{ display: 'block' }}
              data-ad-client={this.props.ad.client}
              data-ad-slot={this.props.ad.slot}
              data-ad-format='auto' />
        );
      }
}
