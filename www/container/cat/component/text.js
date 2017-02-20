/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React from 'react';
import {connect} from 'react-redux';
import BaseView from '../../../core/Base-view';
import {TimelineLite, Back} from 'gsap';
import BaseModel from './../../../core/Base-model';
import {setIsTexting} from './../action/index';

const tweenText = 'tween-text';

class Text extends BaseView {

    constructor() {

        super();

        this.model = new BaseModel();

    }

    animateText() {

        let view = this,
            model = view.model,
            oldTl = model.get(tweenText),
            wrapperNode = view.refs.wrapper,
            mySplitText = new SplitText(wrapperNode, {type: 'words, chars'}),
            chars = mySplitText.chars,
            tl = new TimelineLite();

        this.props.setIsTextingAction(false);

        if (oldTl) {
            oldTl.kill();
        }

        model.set(tweenText, tl);

        tl
            .fromTo(wrapperNode, 0.75, {alpha: 0, y: '0%'}, {y: '-100%', alpha: 1, ease: Back.easeOut.config(1.4)})
            .add(function () {
                view.props.setIsTextingAction(true);
            })
            .staggerFrom(chars, 0.05, {opacity: 0}, 0.03)
            .add(function () {
                this.kill();
                view.props.setIsTextingAction(false);
                view.props.text.split('\n').forEach(function (chunk, i) {
                    let domNode = view.refs['inner-text-' + i];
                    return domNode && (domNode.textContent = chunk);
                });
            });


    }

    componentDidUpdate() {
        this.animateText();
    }

    componentDidMount() {
        this.animateText();
    }

    render() {

        let text = this.props.text.split('\n').map((chunk, i) => {
            return <div ref={'inner-text-' + i} key={i}>{chunk}</div>;
        });

        return <div ref="wrapper" className="CatView__text">{text}</div>;
    }

}

export default connect(
    null,
    {
        setIsTextingAction: setIsTexting
    }
)(Text);