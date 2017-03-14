import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import setText from './action/setText'

class GameHeader extends Component {

    render() {

        setTimeout(() => this.props.setTextAction('NEW HEADER TEXT'), 1000);

        return <div className="game-header">
            <div className="game-header__back-button" />
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
)(GameHeader);
