import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BaseView from '../core/Base-view';

class HomeView extends BaseView {

    // constructor() {
    //     super();
    //     console.log(this);
    // }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return <div>I am home</div>;
    }

}

HomeView.propTypes = {
    screen: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    })
};

export default connect(state => ({
    screen: state.screen
}))(HomeView);
