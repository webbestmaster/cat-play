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

    getCeilSize() {
        const {width, height} = this.props.screen;
        return Math.round(Math.min(width, height) / 4);
    }

    renderRow(indexOfRow) {

        const view = this;
        const model = view.model;
        const field = model.get(CONST.field.object);
        const ceilSize = view.getCeilSize();
        const td = [];

        field.forEach((column, x) => {
            column.forEach((ceil, y) => {
                if (y !== indexOfRow) {
                    return;
                }

                const src = require('./img/' + ceil.toLowerCase() + '.svg');

                td.push(
                    <div className="tic-tac-toe__ceil" key={x + '-' + y} onClick={() => {

                        const wasClick = model.onClickIn(x, y);

                        if (!wasClick) {
                            return;
                        }

                        model.nextTurn();

                    }} style={{width: ceilSize + 'px', height: ceilSize + 'px'}}>
                        <img className="tic-tac-toe__ceil-content" src={src} alt={ceil}/>
                    </div>
                )
            });

        });

        return td;

    }

    renderField() {

        const view = this;
        const model = view.model;
        const ceilSize = view.getCeilSize();
        const field = view.model.get(CONST.field.object);
        const players = model.get(CONST.players.key);
        const player0 = players[0];
        const player1 = players[1];

        return [
            <div
                key="player-score-0"
                className="tic-tac-toe__score">
                <p className="tic-tac-toe__score-label">Player 1: {player0.get(CONST.player.weapon.key)}</p>
                <p className="tic-tac-toe__score-number">{player0.get(CONST.player.score.key)}</p>
            </div>,
            <div
                key="player-score-1"
                className="tic-tac-toe__score">
                <p className="tic-tac-toe__score-label">Player 2: {player1.get(CONST.player.weapon.key)}</p>
                <p className="tic-tac-toe__score-number">{player1.get(CONST.player.score.key)}</p>
            </div>,
            <div key="tic-tac-toe-field" className="tic-tac-toe__field" style={{
                width: ceilSize * 3 + 'px',
                height: ceilSize * 3 + 'px'
            }}>
                {field[0].map((ceil, i) => view.renderRow(i))}
            </div>
        ]

    }

    changeSettingsWeapons() {

        const view = this;
        const model = view.model;

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
        const model = view.model;

        const player = model.getPlayerById(id);
        const playerMind = player.get(CONST.player.mind.key);
        const cpu = CONST.player.mind.CPU;
        const human = CONST.player.mind.Human;

        player.set(CONST.player.mind.key, playerMind === cpu ? human : cpu);

        view.forceUpdate();

    }

    setDifficult(difficult) {

        const view = this;
        const model = view.model;

        model.set(CONST.ai.difficult.key, difficult);
        view.forceUpdate();

    }

    renderSettings() {

        const view = this;
        const model = view.model;

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

    render() {

        const view = this;

        // const ceilSize = view.getCeilSize();
        // const field = view.model.get(CONST.field.object);

        return <div className="base-view">
            <GameHeader />
            {view.props.isReadyToPlayReducer.isReady ? view.renderField() : view.renderSettings()}
        </div>;

    }

}

TicTacToeView.propTypes = {
    screen: PropTypes.object.isRequired
};

export default connect(
    state => ({
        screen: state.screen,
        isReadyToPlayReducer: state.ticTacToeReducer.isReadyToPlay
    }),
    {
        setIsReadyToPlay,
        headerSetText
    }
)(TicTacToeView);
