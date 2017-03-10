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

                model.set(
                    CONST.model.isOnClickEnabled.key,
                    CONST.model.isOnClickEnabled.disabled
                );

                const ticTacToeAi = new TicTacToeAi();

                const ticTacToeAiConfig = ticTacToeAi.getConfigByDifficultAndSize(
                    model.get(CONST.ai.difficult.key),
                    model.get(CONST.field.width)
                );

                ticTacToeAi.setDeep(ticTacToeAiConfig[CONST.ai.deep.key]);

                ticTacToeAi.setWeapon(playerWeapon);

                ticTacToeAi.getTurn(field).then(node => {

                    const nextField = node.getState();

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

                    model.set(
                        CONST.model.isOnClickEnabled.key,
                        CONST.model.isOnClickEnabled.enabled
                    );

                    model.onClickIn(nextX, nextY);

                    model.waitForAction(model.getNextPlayerId());

                });

                break;

            case CONST.player.mind.Human:


                break;


            default:
                throw 'DID NOT FIND NEEDED PLAYER'


        }


    }

    getNextPlayerId() {

        const model = this;

        const currentPlayerId = model.get(CONST.player.current.id);
        const players = model.get(CONST.players.key);

        if (players[currentPlayerId + 1]) {
            return currentPlayerId + 1;
        }

        return 0;

    }

    getPlayerById(id) {

        const model = this;

        const players = model.get(CONST.players.key);

        return _.find(players, player => player.get('id') === id);

    }

    // return true if all is ok
    onClickIn(x, y) {

        // TODO: check for
        // 1 - field is empty
        // 2 - current player CAN TO TO TURN

        const model = this;

        if (model.get(CONST.model.isOnClickEnabled.key) !== CONST.model.isOnClickEnabled.enabled) {
            console.log('ON CLICK IS DISABLED');
            return false;
        }

        const player = model.getCurrentPlayer();
        const playerWeapon = player.get(CONST.player.weapon.key);

        const field = model.get(CONST.field.object);

        const ceil = field[x][y];

        if (ceil !== CONST_empty) {
            console.log('CEIL IS NOT EMPTY');
            return false;
        }

        field[x][y] = playerWeapon;

        model.get('view').forceUpdate();

        return true;

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