/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BaseView from '../../core/Base-view';

const catImage = require('./cat.svg');
require('./cat.scss');

export default class CatView extends BaseView {

    // constructor() {
    //     super();
    //     console.log('CatView created');
    //     console.log(this);
    // }

    render() {
        return <img className="CatView__cat" src={catImage} alt=""/>;
    }

}

