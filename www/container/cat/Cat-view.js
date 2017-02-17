/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BaseView from '../../core/Base-view';
// import {TimelineLite, Power0} from 'gsap';
import CatModel from './Cat-model';
import CatText from './component/Cat-text';

import actionSay from './action/cat-say';

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

    }

    say(text) {



    }

    componentWillReceiveProps(nextProps) {

        console.log('--->', 'componentWillReceiveProps', nextProps);

        const view = this;
        const model = view.model;

        model.set({
            x: nextProps.click.x,
            y: nextProps.click.y
        });

    }

    render() {
        return <div ref="wrapper" className="CatView__wrapper">

            {this.props.reducerSay.text && <CatText text={this.props.reducerSay.text} />}

            <img className="CatView__cat" src={catImage} onClick={
                ()=>this.props.actionSay('Meow!!! I am THE cat!!!')
            } alt=""/>
        </div>;
    }

}


export default connect(
    state => ({
        reducerSay: state.reducerCatSay,
        screen: state.screen,
        click: state.click
    }),
    {
        actionSay: actionSay
    }
)(CatView);

