/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import React from 'react';
import BaseView from '../../../core/Base-view';
import {TimelineLite, Back, TweenMax} from 'gsap';

export default class Text extends BaseView {

    componentDidMount() {

        let wrapperNode = this.refs.wrapper,
            mySplitText = new SplitText('.js-text-animated', {type: 'words, chars'}),
            chars = mySplitText.chars,
            tl = new TimelineLite({
                onComplete: function () {
                    this.kill();
                }
            });

        tl.set(wrapperNode, {alpha: 0})
            .to(wrapperNode, 0.75, {y: '-100%', alpha: 1, ease: Back.easeOut.config(1.4)})
            .staggerFrom(chars, 0.05, {opacity: 0, ease: Back.easeOut}, 0.03);

    }

    render() {
        return <div ref="wrapper" className="CatView__text js-text-animated">{this.props.text}</div>;
    }

}
