import CONST from 'tic-tac-toe-const';

const {SET_READY_TO_PLAY}= CONST;

export function setIsReadyToPlay(isReady) {

    return {
        type: SET_READY_TO_PLAY,
        isReady: isReady
    };

}





