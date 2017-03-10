import React, {Component, PropTypes} from 'react';
import BaseView from '../../../core/Base-view';
import TicTacToeModel from './tic-tac-toe-model';
import CONST from './tic-tac-toe-const';
import PlayerModel from './player-model';
import {connect} from 'react-redux';

class TicTacToeView extends BaseView {

    constructor() {

        super();

        const view = this;

        const fieldWidth = 3;
        const fieldHeight = 3;

        const model = new TicTacToeModel({
            view,
            [CONST.model.isOnClickEnabled.key]: CONST.model.isOnClickEnabled.enabled,
            [CONST.ai.difficult.key]: CONST.ai.difficult.normal,
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

        model.waitForAction(0);

        view.model = model;

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

    render() {

        const view = this;
        const ceilSize = view.getCeilSize();
        const field = view.model.get(CONST.field.object);

        return <div className="base-view">

            <div className="tic-tac-toe__field" style={{
                width: ceilSize * 3 + 'px',
                height: ceilSize * 3 + 'px'
            }}>

                {field[0].map((ceil, i) => view.renderRow(i))}

            </div>

        </div>;

    }

}

TicTacToeView.propTypes = {
    screen: PropTypes.object.isRequired
};

export default connect(
    state => ({
        screen: state.screen
    }),
    {}
)(TicTacToeView);
