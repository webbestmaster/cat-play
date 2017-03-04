import BaseModel from './../../../core/Base-model';
import CONST from './tic-tac-toe-const';
import getTurn from './ai';

export default class TicTacToeModel extends BaseModel {

    constructor(args) {

        super(args);

        const model = this;

        model.createField();

        getTurn(model.get(CONST.field.object), CONST.X);

    }

    /**
     *
     * @param x
     * @param y
     * @param typeOfPlayer - X or O
     */
    pushTurn(x, y, typeOfPlayer) {



    }

    createField() {

        const model = this;

        const width = model.get(CONST.field.width);
        const height = model.get(CONST.field.height);

        model.set(CONST.field.object, new Array(width).fill(new Array(height).fill(CONST.empty)));

    }



}