import React, {Component} from 'react';
import BaseView from '../../../core/Base-view';
import TicTacToeModel from './tic-tac-toe-model';
import CONST from './tic-tac-toe-const';
import PlayerModel from './player-model';

export default class TicTacToeView extends BaseView {

    constructor() {

        super();

        const view = this;

        const fieldWidth = 3;
        const fieldHeight = 3;

        const model = new TicTacToeModel({
            view,
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

    renderRow(indexOfRow) {

        const view = this;
        const model = view.model;
        const field = view.model.get(CONST.field.object);

        const td = [];

        field.forEach((column, x) => {
            column.forEach((ceil, y) => {

                if (y === indexOfRow) {
                    td.push(<td onClick={() => {
                        model.onClickIn(x, y);
                        model.set(CONST.player.current.id, 0);
                        model.waitForAction(0);
                    }}>{ceil}</td>)
                }

            })

        });

        return <tr key={indexOfRow}>{td}</tr>;


    }

    render() {

        const view = this;
        const field = view.model.get(CONST.field.object);

        return <div>

            <table>
                <tbody>
                {field[0].map((ceil, i) => view.renderRow(i))}
                </tbody>
            </table>

        </div>;

    }

}
