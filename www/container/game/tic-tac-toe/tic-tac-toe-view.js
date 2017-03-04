import React, {Component} from 'react';
import BaseView from '../../../core/Base-view';
import TicTacToeModel from './tic-tac-toe-model';
import CONST from './tic-tac-toe-const';

export default class TicTacToe extends BaseView {

    constructor() {
        super();

        const view = this;

        view.model = new TicTacToeModel({
            [CONST.field.width]: 3,
            [CONST.field.height]: 3
        });


    }

    render() {
        return <div>
            <h1>Tic Tac Toe</h1>
        </div>;
    }

}
