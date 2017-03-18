import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import setText from './action/setText'
import {withRouter} from 'react-router';
import {TimelineLite, Power2} from "gsap";
import appConst from '../../const';

class GameHeader extends Component {

    componentDidMount() {

        const view = this;
        const wrapper = view.refs.wrapper;
        const tl = new TimelineLite();
        const tweenTime = appConst.tween.time;

        tl
            .set(wrapper, {y: '-100%'})
            .to(wrapper, tweenTime, {y: '0%'})
            .call(() => tl.kill());

    }

    componentDidUpdate(prevProps, prevState) {

        const view = this;
        const prevText = prevProps.headerTextReducer.text;
        const currentText = view.props.headerTextReducer.text;
        const tweenTime = appConst.tween.time;

        if (prevText !== currentText) {

            const header = view.refs.header;
            const mySplitText = new SplitText(header, {type: 'words, chars'});
            const chars = mySplitText.chars;
            const tl = new TimelineLite();

            header.textContent = prevText;

            tl.to(header, tweenTime, {y: '-100%'})
                .call(() => header.textContent = currentText)
                .to(header, tweenTime, {y: '0%'})
                .call(() => tl.kill());

        }

    }

    render() {
        return <div ref="wrapper" className="game-header">
            <div className="game-header__back-button" onClick={() => this.props.router.goBack() }/>
            <h2 ref="header" className="game-header__header">{this.props.headerTextReducer.text}</h2>
        </div>;

    }

}

export default connect(
    state => ({
        headerTextReducer: state.gameHeaderReducer.headerText
    }),
    {
        setTextAction: setText
    }
)(withRouter(GameHeader));
