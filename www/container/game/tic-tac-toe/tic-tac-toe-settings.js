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
// require.context('./img/', true, /\.svg$/);
import { withRouter } from 'react-router';
import {TimelineLite, Power2} from "gsap";

export default class TicTacToeSettingsView extends BaseView {

    changeSettingsWeapons() {

        const view = this;
        const model = view.props.model;

        const players = model.get(CONST.players.key);

        players.forEach(player => {
            const weapon = player.get(CONST.player.weapon.key);
            const X = CONST.player.weapon.X;
            const O = CONST.player.weapon.O;
            player.set(CONST.player.weapon.key, weapon === X ? O : X);
        });

        view.forceUpdate();

    }

    changeSettingsMind(id) {

        const view = this;
        const model = view.props.model;

        const player = model.getPlayerById(id);
        const playerMind = player.get(CONST.player.mind.key);
        const cpu = CONST.player.mind.CPU;
        const human = CONST.player.mind.Human;

        player.set(CONST.player.mind.key, playerMind === cpu ? human : cpu);

        view.forceUpdate();

    }

    setDifficult(difficult) {

        const view = this;
        const model = view.props.model;

        model.set(CONST.ai.difficult.key, difficult);
        view.forceUpdate();

    }

    render() {

        const view = this;
        const model = view.props.model;

        const players = model.get(CONST.players.key);
        const player0 = players[0];
        const player1 = players[1];

        const currentDifficult = model.get(CONST.ai.difficult.key);
        const difficultHard = CONST.ai.difficult.hard;
        const difficultNormal = CONST.ai.difficult.normal;
        const difficultEase = CONST.ai.difficult.ease;
        const player0MindType = player0.get(CONST.player.mind.key);
        const player1MindType = player1.get(CONST.player.mind.key);
        const humanMindType = CONST.player.mind.Human;
        const cpuMindType = CONST.player.mind.CPU;
        const difficultAddedClass = player0MindType === cpuMindType || player1MindType === cpuMindType ? '' : ' serv__disabled';

        return <div className="form">
            <h3 className="form__header">Settings</h3>

            <h4 className={'form__sub-header' + difficultAddedClass}>Difficult</h4>
            <div className={'form__section' + difficultAddedClass}>
                <span
                    className={'form__text-item' + (currentDifficult === difficultEase ? ' form__text-item--selected' : '')}
                    onClick={() => view.setDifficult(difficultEase)}>
                    Ease
                </span>
                <span
                    className={'form__text-item' + (currentDifficult === difficultNormal ? ' form__text-item--selected' : '')}
                    onClick={() => view.setDifficult(difficultNormal)}>
                    Normal
                </span>
                <span
                    className={'form__text-item' + (currentDifficult === difficultHard ? ' form__text-item--selected' : '')}
                    onClick={() => view.setDifficult(difficultHard)}>
                    Hard
                </span>
            </div>

            <h4 className="form__sub-header">Player 1</h4>
            <div className="form__section">
                <span
                    className={'form__text-item' + (player0.get(CONST.player.weapon.key) === CONST.X ? ' form__text-item--selected' : '')}
                    onClick={() => view.changeSettingsWeapons()}>
                    X
                </span>
                <span
                    className={'form__text-item' + (player0.get(CONST.player.weapon.key) === CONST.O ? ' form__text-item--selected' : '')}
                    onClick={() => view.changeSettingsWeapons()}>
                    O
                </span>
                <span
                    className={'form__text-item' + (player0MindType === humanMindType ? ' form__text-item--selected' : '')}
                    onClick={() => view.changeSettingsMind(0)}>
                    Human
                </span>
                <span
                    className={'form__text-item' + (player0MindType === cpuMindType ? ' form__text-item--selected' : '')}
                    onClick={() => view.changeSettingsMind(0)}>
                    CPU
                </span>
            </div>

            <h4 className="form__sub-header">Player 2</h4>
            <div className="form__section">
                <span
                    className={'form__text-item' + (player1.get(CONST.player.weapon.key) === CONST.X ? ' form__text-item--selected' : '')}
                    onClick={() => view.changeSettingsWeapons()}>
                    X
                </span>
                <span
                    className={'form__text-item' + (player1.get(CONST.player.weapon.key) === CONST.O ? ' form__text-item--selected' : '')}
                    onClick={() => view.changeSettingsWeapons()}>
                    O
                </span>
                <span
                    className={'form__text-item' + (player1MindType === humanMindType ? ' form__text-item--selected' : '')}
                    onClick={() => view.changeSettingsMind(1)}>
                    Human
                </span>
                <span
                    className={'form__text-item' + (player1MindType === cpuMindType ? ' form__text-item--selected' : '')}
                    onClick={() => view.changeSettingsMind(1)}>
                    CPU
                </span>
            </div>
            <div className="form__section">
                <div className="form__button form__button--submit" onClick={() => model.startGame()}>start</div>
            </div>
        </div>

    }

}
