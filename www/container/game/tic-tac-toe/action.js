import CONST from './tic-tac-toe-const';

const {SET_READY_TO_PLAY, DRAW_TURN_ON_FIELD, DRAW_NEW_COUNT} = CONST;

export function setIsReadyToPlay(isReady) {

    return {
        type: SET_READY_TO_PLAY,
        isReady: isReady
    };

}

export function drawTurnOnField(x, y, weapon) {

    return {
        type: DRAW_TURN_ON_FIELD,
        x,
        y,
        weapon
    };

}

export function drawNewCount(value, playerId) {

    return {
        type: DRAW_NEW_COUNT,
        value,
        playerId
    };

}
