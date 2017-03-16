import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import setText from './action/setText'
import { withRouter } from 'react-router';

class GameHeader extends Component {

    render() {
        return <div className="game-header">
            <div className="game-header__back-button" onClick={() => this.props.router.goBack() }/>
            <h2 className="game-header__header">{this.props.headerTextReducer.text}</h2>
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
