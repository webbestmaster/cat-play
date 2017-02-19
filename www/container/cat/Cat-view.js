/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BaseView from '../../core/Base-view';
import CatModel from './Cat-model';
import Text from './component/text';

import {showText} from './action/index';

const catImage = require('./img/cat.svg');

require('./style/cat.scss');

class CatView extends BaseView {

    constructor() {
        super();

        let view = this;
        let model = new CatModel({
            view: view,
            x: 0,
            y: 0
        });

        model.bindEventListeners();

        view.model = model;


    }

    componentDidMount() {

        let view = this;

        view.initializeDomNode();

        view.props.showTextAction('Lorem ipsum dolor sit amet, ' +
            'consectetur adipisicing elit. Accusantium aperiam, beatae blanditiis dicta dolor, dolores, ' +
            'ipsa mollitia optio sapiente veritatis vero voluptas! ' +
            'Aspernatur doloribus eius expedita explicabo, ipsum itaque quam.');

    }

    initializeDomNode() {

        let view = this;
        let model = view.model;
        let screen = view.props.screen;

        let minSize = Math.round(Math.min(screen.width, screen.height) / 4);

        model.set({
            [model.const.node.width]: minSize,
            [model.const.node.height]: minSize
        });

        model.set('x', Math.round(screen.width / 2));
        model.set('y', Math.round(screen.height / 2));

    }

    componentWillReceiveProps(nextProps) {

        console.log('--->', 'componentWillReceiveProps', nextProps);

        const view = this;
        const model = view.model;
        const screen = nextProps.screen;

        // centrize cat head
        const minSize = Math.round(Math.min(screen.width, screen.height) / 4);

        model.set({
            [model.const.node.width]: minSize,
            [model.const.node.height]: minSize
        });

        model.set({
            x: Math.round(screen.width / 2),
            y: Math.round(screen.height / 2)
        });

    }

    render() {
        return <div ref="wrapper" className="CatView__wrapper">
            {this.props.showTextReducer.text && <Text text={this.props.showTextReducer.text}/>}
            <img className="CatView__cat" src={catImage} alt=""/>
        </div>;
    }

}

export default connect(
    state => ({
        showTextReducer: state.catReducer.showText,
        screen: state.screen,
        click: state.click
    }),
    {
        showTextAction: showText
    }
)(CatView);

