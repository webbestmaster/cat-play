/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BaseView from '../../core/Base-view';
import CatModel from './Cat-model';
import Text from './component/text';
import {TimelineLite, Back} from 'gsap';

import {showText} from './action/index';
import util from './../../services/util';

const catImage = require('./img/cat.svg');

// require('./style/cat.scss');

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
        let screen = view.props.screen;
        let model = view.model;

        model.set({
            [model.const.screen.width]: screen.width,
            [model.const.screen.height]: screen.height
        });

        model.setCornerAboutScreen(5, 5);
        view.animateAppearing()
            .then(() => {
                let xy = model.getXyCornerAboutScreen(2, 5);
                return model.moveToAnimated(xy.x, xy.y, 0.75, Back.easeOut.config(1.4));
            })
            .then(() => {
                model.setCornerAboutScreen(2, 5);
                model.set(
                    model.const.state.behaviour.value,
                    model.const.state.behaviour.greeting
                );
                view.nextTextSequence();
            });

    }

    animateAppearing() {

        return new Promise((resolve, reject) => {

            let view = this,
                imageNode = view.refs.image,
                tl = new TimelineLite({
                    onComplete: function () {
                        this.kill();
                        imageNode.removeAttribute('style');
                        resolve();
                    }
                });

            tl.fromTo(imageNode, 1.2, {alpha: 0, scale: 0}, {delay: 0.3, alpha: 1, scale: 1, ease: Back.easeOut.config(1.4)});

        });

    }

    componentWillReceiveProps(nextProps) {

        console.log('--->', 'componentWillReceiveProps', nextProps);

        const view = this;
        const model = view.model;
        const screen = nextProps.screen;

        model.set({
            [model.const.screen.width]: screen.width,
            [model.const.screen.height]: screen.height
        });

        model.set(model.const.state.is.texting, nextProps.setIsTextingReducer.isTexting);

    }

    nextTextSequence() {

        const view = this;
        const model = view.model;
        let message, textList, xy;

        switch (model.get(model.const.state.behaviour.value)) {

            case model.const.state.behaviour.greeting:

                textList = model.get(model.const.text.welcome);
                message = textList.shift();

                if (message) {
                    return view.props.showTextAction(message);
                }

                view.props.showTextAction('');

                model.set(
                    model.const.state.behaviour.value,
                    model.const.state.behaviour.selectGame
                );

                xy = model.getXyCornerAboutScreen(8, 8);

                model
                    .moveToAnimated(xy.x, xy.y, 0.75, Back.easeOut.config(1.4))
                    .then(() => {
                        textList = model.get(model.const.text.selectGame);
                        view.props.showTextAction(textList[0]);
                    });

                break;

            case model.const.state.behaviour.selectGame:

                textList = model.get(model.const.text.selectGame);
                message = textList[util.getRandom(1, 5)];

                view.props.showTextAction(message);

                break;

        }

    }

    render() {
        let text = this.props.showTextReducer.text;
        return <div ref="wrapper" className="CatView__wrapper">
            {text && <Text text={text}/>}
            <img className="CatView__cat" ref="image" onClick={() => this.nextTextSequence()} src={catImage} alt=""/>
        </div>;
    }

}

export default connect(
    state => ({
        showTextReducer: state.catReducer.showText,
        setIsTextingReducer: state.catReducer.setIsTexting,
        screen: state.screen
    }),
    {
        showTextAction: showText
    }
)(CatView);
