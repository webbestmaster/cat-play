import React, {Component, PropTypes} from 'react';
import BaseView from '../../../core/Base-view';
import TicTacToeModel from './tic-tac-toe-model';
import CONST from './tic-tac-toe-const';
import PlayerModel from './player-model';
import {connect} from 'react-redux';
import {setIsReadyToPlay} from './action';

class TicTacToeView extends BaseView {

    constructor() {

        super();

        const view = this;

        const fieldWidth = 3;
        const fieldHeight = 3;

        const model = new TicTacToeModel({
            view,
            [CONST.model.isOnClickEnabled.key]: CONST.model.isOnClickEnabled.enabled,
            [CONST.ai.difficult.key]: CONST.ai.difficult.hard,
            [CONST.players.key]: [
                new PlayerModel({
                    id: 0,
                    [CONST.player.mind.key]: CONST.player.mind.CPU,
                    [CONST.player.weapon.key]: CONST.player.weapon.X
                }),
                new PlayerModel({
                    id: 1,
                    [CONST.player.mind.key]: CONST.player.mind.Human,
                    [CONST.player.weapon.key]: CONST.player.weapon.O
                })
            ],
            [CONST.field.width]: fieldWidth,
            [CONST.field.height]: fieldHeight
        });


        view.model = model;

    }

    componentWillMount() {
        this.props.setIsReadyToPlay(false);
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
                td.push(
                    <div className="tic-tac-toe__ceil" key={x + '-' + y} onClick={() => {

                        const wasClick = model.onClickIn(x, y);

                        if (!wasClick) {
                            return;
                        }

                        model.waitForAction(model.getNextPlayerId());

                    }} style={{width: ceilSize + 'px', height: ceilSize + 'px'}}>{ceil}</div>
                )
            });

        });

        return td;

    }

    renderField() {

        const view = this;
        const ceilSize = view.getCeilSize();
        const field = view.model.get(CONST.field.object);


        return <div className="tic-tac-toe__field" style={{
            width: ceilSize * 3 + 'px',
            height: ceilSize * 3 + 'px'
        }}>

            {field[0].map((ceil, i) => view.renderRow(i))}

        </div>

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

    changeSettingsMind() {

        const view = this;
        const model = view.model;

        const players = model.get(CONST.players.key);

        players.forEach(player => {
            const mind = player.get(CONST.player.mind.key);
            const cpu = CONST.player.mind.CPU;
            const human = CONST.player.mind.Human;
            player.set(CONST.player.mind.key, mind === cpu ? human : cpu);
        });

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

        return <div>
            <h1>settings</h1>

            <div>
                difficult
                <span onClick={() => view.setDifficult(difficultHard)}>  {difficultHard}  {currentDifficult === difficultHard ? '*' : ''}</span>
                <span onClick={() => view.setDifficult(difficultNormal)}>  {difficultNormal}  {currentDifficult === difficultNormal ? '*' : ''}</span>
                <span onClick={() => view.setDifficult(difficultEase)}>  {difficultEase}  {currentDifficult === difficultEase ? '*' : ''}</span>
            </div>

            <table>
                <thead>
                <tr>
                    <td>player's number</td>
                    <td>X/O</td>
                    <td>cpu/human</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>player 1</td>
                    <td onClick={() => view.changeSettingsWeapons()}>{player0.get(CONST.player.weapon.key)}</td>
                    <td onClick={() => view.changeSettingsMind()}>{player0.get(CONST.player.mind.key)}</td>
                </tr>
                <tr>
                    <td>player 2</td>
                    <td onClick={() => view.changeSettingsWeapons()}>{player1.get(CONST.player.weapon.key)}</td>
                    <td onClick={() => view.changeSettingsMind()}>{player1.get(CONST.player.mind.key)}</td>
                </tr>
                </tbody>
            </table>
            <button onClick={() => {
                this.props.setIsReadyToPlay(true);
                model.waitForAction(0);
            }}>start</button>
        </div>

    }

    render() {

        const view = this;

        // const ceilSize = view.getCeilSize();
        // const field = view.model.get(CONST.field.object);

        return <div className="base-view">

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
        setIsReadyToPlay
    }
)(TicTacToeView);
