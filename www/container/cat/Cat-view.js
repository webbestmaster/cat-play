/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BaseView from '../../core/Base-view';
import {TimelineLite, Power0} from 'gsap';
import CatModel from './Cat-model';

const catImage = require('./cat.svg');

require('./cat.scss');

class CatView extends BaseView {

    constructor() {
        super();
        this.model = new CatModel();
    }

    componentDidMount() {

        let model = this;

        model.initializeDomNode();

        // this.moveTo(x, y, 10);

    }

    initializeDomNode() {

        let view = this;
        let model = view.model;
        let screen = view.props.screen;
        // let screenWidth = screen.width;
        // let screenHeight = screen.height;

        let minSize = Math.round(Math.min(screen.width, screen.height) / 4);

        view.refs.wrapper.style.width = minSize + 'px';

        model.set('node.width', minSize);
        model.set('node.height', minSize);

    }

    say(text) {


    }

    componentWillReceiveProps(nextProps) {
        console.log('--->', nextProps);
        this.moveTo(nextProps.click.x, nextProps.click.y, 3);
    }

    moveTo(x, y, time = 0) {

        let view = this;
        let tl = new TimelineLite();

        let prevTween = this.model.get('tween.move');

        if (prevTween) {
            prevTween.pause();
            prevTween.kill();
        }

        this.model.set('tween.move', tl.to(this.refs.wrapper, time, {x, y, ease: Power0.easeNone}));

        return view;

    }

    render() {
        return <div ref="wrapper" className="CatView__wrapper">
            <img className="CatView__cat" src={catImage} alt=""/>
        </div>;
    }

}


export default connect(
    state => ({
        screen: state.screen,
        click: state.click
    })
)(CatView);

