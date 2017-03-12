/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BaseView from '../../core/Base-view';
import CatModel from './cat-model';
import Text from './component/text';
import {TimelineLite, Back} from 'gsap';

import {showText} from './action/index';
import {showButtonsAction} from './../view/home/action/index'
import util from './../../services/util';
import CONST from './constant';

const MODEL_CONST = CONST.model;
const catImage = require('./img/cat.svg');
import i18n from './../../services/i18n';
const getTranslate = i18n.get;

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
            [MODEL_CONST.screen.width]: screen.width,
            [MODEL_CONST.screen.height]: screen.height
        });

        model.setCornerAboutScreen(5, 5);

        const promise = view.animateAppearing();

        if (view.props.routing.locationBeforeTransitions.pathname === '/') {

            promise
                .then(() => {

                    let endX = 2,
                        endY = 5,
                        xy = model.getXyCornerAboutScreen(endX, endY);

                    return model
                        .moveToAnimated(xy.x, xy.y, 0.75, Back.easeOut.config(1.4))
                        .then(() => model.setCornerAboutScreen(endX, endY));

                })
                .then(() => model.showTextSequence(getTranslate('welcomeTextList')))
                .then(() => {

                    let endX = 8,
                        endY = 8,
                        xy = model.getXyCornerAboutScreen(endX, endY);

                    return model
                        .moveToAnimated(xy.x, xy.y, 0.75, Back.easeOut.config(1.4))
                        .then(() => {
                            model.setCornerAboutScreen(endX, endY);
                            view.props.showButtonsAction(true);
                        })

                })
                .then(() => model.showTextSequence(getTranslate('selectGameTextList')))
                .then(() => model.showTextSequence(util.copyShuffle(getTranslate('randomPhraseTextList'))));

            return;
        }

        promise
            .then(() => {
                let endX = 8,
                    endY = 8,
                    xy = model.getXyCornerAboutScreen(endX, endY);

                return model
                    .moveToAnimated(xy.x, xy.y, 0.75, Back.easeOut.config(1.4))
                    .then(() => {
                        model.setCornerAboutScreen(endX, endY);
                        view.props.showButtonsAction(true);
                    })

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

            tl.fromTo(imageNode, 1.2, {alpha: 0, scale: 0}, {
                delay: 0.3,
                alpha: 1,
                scale: 1,
                ease: Back.easeOut.config(1.4)
            });

        });

    }

    componentWillReceiveProps(nextProps) {

        console.log('--->', 'componentWillReceiveProps', nextProps);

        const view = this;
        const model = view.model;
        const screen = nextProps.screen;

        model.set({
            [MODEL_CONST.screen.width]: screen.width,
            [MODEL_CONST.screen.height]: screen.height
        });

        model.set(MODEL_CONST.state.is.texting, nextProps.setIsTextingReducer.isTexting);

    }

    showTextNext(e) {

        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        this.model.showTextNext();

    }

    render() {
        const view = this;
        let text = view.props.showTextReducer.text;

        return <div ref="wrapper" className="CatView__wrapper">
            {text && <Text onClickFn={view.showTextNext} onClickCtx={view} text={text}/>}
            <img onClick={e => this.showTextNext(e)} className="CatView__cat" ref="image" src={catImage} alt="cat"/>
        </div>;
    }

}

export default connect(
    state => ({
        routing: state.routing,
        showTextReducer: state.catReducer.showText,
        setIsTextingReducer: state.catReducer.setIsTexting,
        screen: state.screen
    }),
    {
        showTextAction: showText,
        showButtonsAction: showButtonsAction
    }
)(CatView);
