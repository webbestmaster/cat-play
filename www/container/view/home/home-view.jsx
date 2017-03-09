import React, {Component} from 'react';
import {Link} from 'react-router';
import BaseView from '../../../core/Base-view';
import {connect} from 'react-redux';
import changeLanguage from './../../../actions/change-language';
import i18n from './../../../services/i18n';
const getTranslate = i18n.get;

class HomeView extends BaseView {

    changeLanguage(localeName) {
        i18n.setLang(localeName);
        this.forceUpdate();
    }

    render() {

        const view = this;
        const props = view.props;

        return <div className="base-view">
            <div>
                <button onClick={ () => view.props.changeLanguageAction('ru') }>ru</button>
                <button onClick={ () => view.props.changeLanguageAction('en') }>en</button>
            </div>

            <div className="base-view__center-buttons-wrapper">
                {props.showButtonsReducer.isShowButtons &&
                <Link className="base-view__center-button" to="/game/tic-tac-toe">{getTranslate('ticTacToe')}</Link>}
            </div>
        </div>;

    }

}

export default connect(
    state => ({
        showButtonsReducer: state.homeReducer.showButtonsReducer,
        currentLanguage: state.currentLanguage
    }),
    {
        changeLanguageAction: changeLanguage
    }
)(HomeView);
