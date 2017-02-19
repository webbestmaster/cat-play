/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React from 'react';
import {connect} from 'react-redux';
import BaseView from '../../../core/Base-view';
import {TimelineLite, Back} from 'gsap';

import {showText, setIsTexting} from './../action/index';

class Text extends BaseView {

    animateText() {

        let wrapperNode = this.refs.wrapper,
            mySplitText = new SplitText(wrapperNode, {type: 'words, chars'}),
            chars = mySplitText.chars,
            tl = new TimelineLite({
                onComplete: function () {
                    this.kill();
                }
            });

        this.props.setIsTextingAction(true);

        tl
            .fromTo(wrapperNode, 0.75, {alpha: 0, y: '0%'}, {y: '-100%', alpha: 1, ease: Back.easeOut.config(1.4)})
            .staggerFrom(chars, 0.05, {opacity: 0}, 0.03);

    }

    componentDidUpdate() {
        this.animateText();
    }

    componentDidMount() {
        this.animateText();
    }

    render() {

        let text = this.props.text.split('\n').map((chunk, i) => {
            return <div key={i}>{chunk}</div>;
        });

        return <div ref="wrapper" className="CatView__text">{text}</div>;
    }

}

// console.log()

export default connect(
    null,
    {
        setIsTextingAction: setIsTexting
    }
)(Text);