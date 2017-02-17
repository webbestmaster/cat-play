/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React from 'react';
import BaseView from '../../../core/Base-view';

export default class CatText extends BaseView {

    render() {
        return <div className="CatView__text">{this.props.text}</div>;
    }

}
