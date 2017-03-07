import React, {Component} from 'react';
import {Link} from 'react-router';
import BaseView from '../../../core/Base-view';
import {connect} from 'react-redux';

class HomeView extends BaseView {

    componentWillReceiveProps(nextProps) {
        debugger
    }

    render() {
        return <div className="base-view">
            <div className="base-view__center-buttons-wrapper">
                <Link className="js-show-me base-view__center-button" to="/game/tic-tac-toe">Tic Tac Toe</Link>
                <Link className="js-show-me base-view__center-button" to="/game/tic-tac-toe">Tic Tac Toe</Link>
                <Link className="js-show-me base-view__center-button" to="/game/tic-tac-toe">Tic Tac Toe</Link>
            </div>
        </div>;
    }

}


export default connect(
    state => ({
        showButtonsReducer: state.homeReducer.showButtonsReducer
    }),
    null
)(HomeView);
