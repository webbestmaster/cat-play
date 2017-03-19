import React, {Component, PropTypes} from 'react';
import BaseView from '../../../core/Base-view';
import TicTacToeModel from './tic-tac-toe-model';
import CONST from './tic-tac-toe-const';
import PlayerModel from './player-model';
import {connect} from 'react-redux';
import {setIsReadyToPlay, drawTurnOnField, drawNewCount} from './action';
import GameHeader from './../../../component/game-header/view';
import headerSetText from './../../../component/game-header/action/setText';
import i18n from './../../../services/i18n';
import {TimelineLite, Power2} from "gsap";
import TicTacToeSettingsView from './tic-tac-toe-settings';
import TicTacToeFieldView from './tic-tac-toe-field';
import {withRouter} from 'react-router';
import timer from './../../../services/timer';
require.context('./img/', true, /\.svg$/);

class TicTacToeView extends BaseView {

    constructor() {

        super();

        const view = this;

        const fieldWidth = 3;
        const fieldHeight = 3;

        view.model = new TicTacToeModel({
            view,
            [CONST.model.isOnClickEnabled.key]: CONST.model.isOnClickEnabled.enabled,
            [CONST.ai.difficult.key]: CONST.ai.difficult.normal,
            [CONST.gameLimit.key]: CONST.gameLimit.max,
            [CONST.players.key]: [
                new PlayerModel({
                    id: 0,
                    [CONST.player.score.key]: 0,
                    [CONST.player.mind.key]: CONST.player.mind.Human,
                    [CONST.player.weapon.key]: CONST.player.weapon.X
                }),
                new PlayerModel({
                    id: 1,
                    [CONST.player.score.key]: 0,
                    [CONST.player.mind.key]: CONST.player.mind.CPU,
                    [CONST.player.weapon.key]: CONST.player.weapon.O
                })
            ],
            [CONST.field.width]: fieldWidth,
            [CONST.field.height]: fieldHeight
        });

    }

    routerWillLeave(e) {

        const view = this;
        const markId = 'tic-tac-toe-route-living';
        const maxTimeForDblClick = 2e3;
        const now = Date.now();
        const lastTime = timer.getTimeByMark(markId) || 0;
        const deltaTime = now - lastTime;

        if (deltaTime < maxTimeForDblClick) {
            return true;
        }

        timer.createMark(markId);
        view.props.router.goForward();
        view.props.headerSetText(i18n.get('press_again_to_exit'));

        return false;

    }

    componentWillMount() {

        const view = this;
        const props = view.props;

        props.router.setRouteLeaveHook(
            props.route,
            e => view.routerWillLeave(e)
        );

        props.headerSetText(i18n.get('good_luck') + '!');
        props.setIsReadyToPlay(false);

    }

    componentWillUnmount() {
        this.props.setIsReadyToPlay(false);
    }

    render() {

        const view = this;

        return <div className="base-view" ref="wrapper">
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
        headerSetText,
        drawTurnOnField,
        drawNewCount
    }
)(withRouter(TicTacToeView));
