import React, {Component, PropTypes} from 'react';
import BaseView from '../../../core/Base-view';
import TicTacToeModel from './tic-tac-toe-model';
import CONST from './tic-tac-toe-const';
import PlayerModel from './player-model';
import {connect} from 'react-redux';
import {setIsReadyToPlay} from './action';
import GameHeader from './../../../component/game-header/view';
import headerSetText from './../../../component/game-header/action/setText';
import i18n from './../../../services/i18n';
require.context('./img/', true, /\.svg$/);
import {withRouter} from 'react-router';
import {TimelineLite, Power2} from "gsap";
import TicTacToeSettingsView from './tic-tac-toe-settings';
import TicTacToeFieldView from './tic-tac-toe-field';

class TicTacToeView extends BaseView {

    constructor() {

        super();

        const view = this;

        const fieldWidth = 3;
        const fieldHeight = 3;

        view.model = new TicTacToeModel({
            view,
            [CONST.model.isOnClickEnabled.key]: CONST.model.isOnClickEnabled.enabled,
            [CONST.ai.difficult.key]: CONST.ai.difficult.hard,
            [CONST.gameLimit.key]: CONST.gameLimit.max,
            [CONST.players.key]: [
                new PlayerModel({
                    id: 0,
                    [CONST.player.score.key]: 0,
                    [CONST.player.mind.key]: CONST.player.mind.CPU,
                    [CONST.player.weapon.key]: CONST.player.weapon.X
                }),
                new PlayerModel({
                    id: 1,
                    [CONST.player.score.key]: 0,
                    [CONST.player.mind.key]: CONST.player.mind.Human,
                    [CONST.player.weapon.key]: CONST.player.weapon.O
                })
            ],
            [CONST.field.width]: fieldWidth,
            [CONST.field.height]: fieldHeight
        });

    }

    componentWillMount() {

        const view = this;

        view.props.headerSetText(i18n.get('good_luck') + '!');
        view.props.setIsReadyToPlay(false);

    }

    render() {

        const view = this;

        return <div className="base-view">
            <GameHeader />
            {
                view.props.isReadyToPlayReducer.isReady ?
                    <TicTacToeFieldView model={view.model}/> :
                    <TicTacToeSettingsView model={view.model}/>
            }
        </div>;

    }

}

// TicTacToeView.propTypes = {
//     screen: PropTypes.object.isRequired
// };

export default connect(
    state => ({
        // screen: state.screen,
        isReadyToPlayReducer: state.ticTacToeReducer.isReadyToPlay
    }),
    {
        setIsReadyToPlay,
        headerSetText
    }
)(TicTacToeView);
