import CONST from './tic-tac-toe-const';

const {SET_READY_TO_PLAY, DRAW_TURN_ON_FIELD} = CONST;

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
