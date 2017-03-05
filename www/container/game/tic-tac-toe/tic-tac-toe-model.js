import BaseModel from './../../../core/Base-model';
import CONST from './tic-tac-toe-const';
// import getTurns from './tic-tac-toe-ai';
const _ = require('lodash');
import TicTacToeAi from './tic-tac-toe-ai'

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

        model.set(CONST.player.current.id, playerId);

        const field = model.get(CONST.field.object);
        const player = model.getPlayerById(playerId);
        const playerWeapon = player.get(CONST.player.weapon.key);

        switch (player.get(CONST.player.mind.key)) {

            case CONST.player.mind.CPU:

                const ticTacToeAi = new TicTacToeAi();

                ticTacToeAi.setDeep(7);
                ticTacToeAi.setWeapon(playerWeapon);

                ticTacToeAi.getTurn(field).then(tweak => {

                    const tweakLength = tweak.length;

                    if (tweakLength === 0 || tweakLength === 1) {
                        throw ' I SHOULD BE CATCH!';
                    }

                    const nextField = tweak[tweak.length - 2].getState();

                    const comparing = ticTacToeAi.compareFields(field, nextField);

                    let nextX;
                    let nextY;

                    comparing.forEach((column, x) => column.forEach((ceil, y) => {
                        if (ceil) {
                            return;
                        }
                        nextX = x;
                        nextY = y;

                    }));

                    model.onClickIn(nextX, nextY);

                    model.set(CONST.player.current.id, 1);
                    model.waitForAction(1);

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