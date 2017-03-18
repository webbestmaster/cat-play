import CONST from './tic-tac-toe-const';

import {combineReducers} from 'redux';

const {SET_READY_TO_PLAY, DRAW_TURN_ON_FIELD} = CONST;

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

const newDrawing = (function () {

    const initialState = {
        x: NaN,
        y: NaN,
        weapon: null
    };

    return function (state = initialState, action) {

        if (action.type === DRAW_TURN_ON_FIELD) {
            return {
                ...state,
                x: action.x,
                y: action.y,
                weapon: action.weapon
            };
        }

        return state;

    }

}());

export default combineReducers({
    isReadyToPlay,
    newDrawing
});
