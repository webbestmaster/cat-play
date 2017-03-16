import React, {Component} from 'react';
import {Link} from 'react-router';
import BaseView from '../../../core/Base-view';
import {connect} from 'react-redux';
import changeLanguage from './../../../actions/change-language';
import {TimelineLite, Power2} from "gsap";
import i18n from './../../../services/i18n';
const getTranslate = i18n.get;

class HomeView extends BaseView {

    changeLanguage(localeName) {

        const view = this;

        i18n.setLang(localeName);

        view.props.changeLanguageAction(localeName);

    }

    componentDidMount() {

        const view = this;
        const refs = view.refs;

        const tweenTime = 0.3;

        const flag1 = refs.flag_1;
        const flag2 = refs.flag_2;
        const button = refs.wrapper.querySelector('.js-home-page-button');

        const ease = Power2.easeOut;

        const tl = new TimelineLite();
        tl
            .set(flag2, {scale: 2, alpha: 0})
            .set(flag1, {scale: 2, alpha: 0})
            .set(button, {scale: 2, alpha: 0})
            .to(flag2, tweenTime, {delay: 0.1, scale: 1, alpha: 1, ease})
            .to(flag1, tweenTime, {scale: 1, alpha: 1, ease}, '-=0.2')
            .to(button, tweenTime, {scale: 1, alpha: 1, ease}, '-=0.2')
            .call(() => tl.kill());

    }

    render() {

        const view = this;

        return <div ref="wrapper" className="base-view">
            <div className="home-view__language">
                <div ref="flag_1" onClick={ () => view.changeLanguage('en')} className="home-view__flag home-view__flag--en"></div>
                <div ref="flag_2" onClick={ () => view.changeLanguage('ru')} className="home-view__flag home-view__flag--ru"></div>
            </div>

            <div className="base-view__center-buttons-wrapper">
                <Link className="js-home-page-button base-view__center-button" to="/game/tic-tac-toe">{getTranslate('ticTacToe')}</Link>
            </div>

        </div>;

    }

}

export default connect(
    state => ({
        // showButtonsReducer: state.homeReducer.showButtonsReducer,
        currentLanguage: state.currentLanguage
    }),
    {
        changeLanguageAction: changeLanguage
    }
)(HomeView);
