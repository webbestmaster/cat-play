import CONST from '../const';

const initialState = {
    isShowButtons: false
};

const SHOW_BUTTONS = CONST.SHOW_BUTTONS;

export default function showButtonsReducer(state = initialState, action) {

    if (action.type === SHOW_BUTTONS) {
        return {
            ...state,
            isShowButtons: action.isShowButtons
        };
    }

    return state;

}
