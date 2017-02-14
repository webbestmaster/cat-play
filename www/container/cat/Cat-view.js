/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BaseView from '../../core/Base-view';

export default class CatView extends BaseView {

    // constructor() {
    //     super();
    //     console.log('CatView created');
    //     console.log(this);
    // }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return <div>Cat view</div>;
    }

}

