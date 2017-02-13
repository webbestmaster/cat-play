import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class Home extends Component {

    constructor() {
        super();
        console.log(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return <div>I am home</div>;
    }

}

Home.propTypes = {
    screen: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    })
};

export default connect(state => ({
    screen: state.screen
}))(Home);
