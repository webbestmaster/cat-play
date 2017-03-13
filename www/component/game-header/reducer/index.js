import {combineReducers} from 'redux';

import HEADER_CONST from './../const';

const headerText = (function () {

    const {SET_TEXT} = HEADER_CONST.TYPE;
    const initialState = {
        text: ''
    };

    return function (state = initialState, action) {

        if (action.type === SET_TEXT) {
            return {
                ...state,
                text: action.text
            };
        }

        return state;

    }

}());

export default combineReducers({
    headerText
});

