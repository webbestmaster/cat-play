import BaseModel from './../../../core/Base-model';
import CONST from './tic-tac-toe-const';
// import getTurns from './tic-tac-toe-ai';
const _ = require('lodash');
import TicTacToeAi from './tic-tac-toe-ai'
import {whoWin, isFieldFull} from './tic-tac-toe-ai';
import i18n from './../../../services/i18n';

const CONST_empty = CONST.empty;
const CONST_X = CONST.X;
const CONST_O = CONST.O;
const CONST_X_CONST_O = [CONST_O, CONST_X];

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

    startGame() {

        const model = this;
        model.set(CONST.player.current.id, 1);
        // model.createField();
        model.createNextGame();

    }

    nextTurn() {

        const model = this;
        const view = model.get('view');
        const field = model.get(CONST.field.object);
        const winnerWeapon = whoWin(field, CONST_X_CONST_O);

        if (winnerWeapon) {
            const winner = model.getPlayerByWeapon(winnerWeapon);
            winner.changeBy(CONST.player.score.key, 1);
            /*
             if (winner.get(CONST.player.score.key) === model.get(CONST.gameLimit.key)) {
             view.props.headerSetText(winnerWeapon + ' ' + i18n.get('win') + '!', () => {

             });
             } else {
             view.props.headerSetText(winnerWeapon + ' ' + i18n.get('win') + '!', () => model.createNextGame());
             view.props.drawNewCount(winner.get(CONST.player.score.key), winner.get('id'));
             }
             */

            view.props.headerSetText(winnerWeapon + ' ' + i18n.get('win') + '!', () => {
                setTimeout(() => model.createNextGame(), 1000);
            });
            view.props.drawNewCount(winner.get(CONST.player.score.key), winner.get('id'));

            return;
        }

        if (isFieldFull(field)) {
            const players = model.get(CONST.players.key);
            players[0].changeBy(CONST.player.score.key, 1);
            players[1].changeBy(CONST.player.score.key, 1);
            view.props.headerSetText(i18n.get('draw') + '!', () => {
                setTimeout(() => model.createNextGame(), 1000);
            });
            return;
        }

        model.updateWaitingFortNextPlayerMessage();

    }

    createNextGame() {

        const model = this;
        const view = model.get('view');

        model.createField();
        view.props.drawTurnOnField(NaN, NaN, true); // just update field

        model.updateWaitingFortNextPlayerMessage();

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

                    let nextX = NaN;
                    let nextY = NaN;

                    comparing.forEach((column, x) => column.forEach((cell, y) => {
                        if (cell) {
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

                    model.nextTurn();

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

    getPlayerByWeapon(weapon) {

        const model = this;

        const players = model.get(CONST.players.key);

        return _.find(players, player => player.get(CONST.player.weapon.key) === weapon);
    }

    // return true if all is ok
    onClickIn(x, y) {

        const model = this;

        if (model.get(CONST.model.isOnClickEnabled.key) !== CONST.model.isOnClickEnabled.enabled) {
            console.log('ON CLICK IS DISABLED');
            return false;
        }

        const player = model.getCurrentPlayer();
        const playerWeapon = player.get(CONST.player.weapon.key);

        const field = model.get(CONST.field.object);

        const cell = field[x][y];

        if (cell !== CONST_empty) {
            console.log('CELL IS NOT EMPTY');
            return false;
        }

        field[x][y] = playerWeapon;

        model.get('view').props.drawTurnOnField(x, y, playerWeapon);

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

    updateWaitingFortNextPlayerMessage() {

        const model = this;
        const view = model.get('view');

        const nextPlayerId = model.getNextPlayerId();
        const nextPlayer = model.getPlayerById(nextPlayerId);

        model.set(CONST.model.isOnClickEnabled.key, CONST.model.isOnClickEnabled.disabled);

        view.props.headerSetText(i18n.get('wait_for') + ' ' + nextPlayer.get(CONST.player.weapon.key),
            () => {
                model.set(CONST.model.isOnClickEnabled.key, CONST.model.isOnClickEnabled.enabled);
                model.waitForAction(nextPlayerId);
            }
        );

    }


}