import CONST from './tic-tac-toe-const';

import {combineReducers} from 'redux';

const SET_READY_TO_PLAY = CONST.SET_READY_TO_PLAY;

const isReadyToPlay = (function () {

    const initialState = {
        isReady: false
    };

    return function (state = initialState, action) {

        if (action.type === SET_READY_TO_PLAY) {
            return {
                ...state,
                isReady: action.isReady
            };
        }

        return state;

    }

}());

export default combineReducers({
    isReadyToPlay
});

