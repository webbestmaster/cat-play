import BaseModel from './../../../core/Base-model';
import CONST from './tic-tac-toe-const';
import getTurns from './ai';
const _ = require('lodash');

const CONST_empty = CONST.empty;
export default class TicTacToeModel extends BaseModel {

    constructor(args) {

        super(args);

        const model = this;

        model.createField();


        /*
         getTurn(model.get(CONST.field.object), CONST.X, 3).then(result => {

         console.log('result --->', result);

         });
         */

    }

    waitForAction(playerId) {

        const model = this;

        const field = model.get(CONST.field.object);
        const player = model.getPlayerById(playerId);
        const playerWeapon = player.get(CONST.player.weapon);

        model.set(CONST.player.current.id, playerId);

        switch (player.get(CONST.player.mind.key)) {

            case CONST.player.mind.CPU:

                getTurns(field, playerWeapon, 4).then(result => {

                    model.onClickIn(1, 0);

                });


                break;

            case CONST.player.mind.Human:


                break;


            default:
                throw 'DID NOT FIND NEEDED PLAYER'


        }


    }

    getPlayerById(id) {

        const model = this;

        const players = model.get(CONST.players.key);

        return _.find(players, player => player.get('id') === id);

    }

    onClickIn(x, y) {

        // TODO: check for
        // 1 - field is empty
        // 2 - current player CAN TO TO TURN

        const model = this;
        const player = model.getCurrentPlayer();
        const playerWeapon = player.get(CONST.player.weapon.key);

        const field = model.get(CONST.field.object);

        field[x][y] = playerWeapon;

        model.get('view').forceUpdate();

    }

    getCurrentPlayer() {

        const model = this;
        const playerId = model.get(CONST.player.current.id);

        return model.getPlayerById(playerId);

    }

    createField() {

        const model = this;

        const width = model.get(CONST.field.width);
        const height = model.get(CONST.field.height);

        const result = [];

        let x, y;

        for (x = 0; x < width; x += 1) {
            result[x] = [];
            for (y = 0; y < height; y += 1) {
                result[x][y] = CONST_empty;
            }
        }

        model.set(CONST.field.object, result);

    }


}