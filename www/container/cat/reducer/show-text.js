import CONST from './../constant';

const typeShowText = CONST.type.showText;

export default function showText(state = {text: ''}, action) {

    if (action.type === typeShowText) {
        return {
            ...state,
            text: action.text
        };
    }

    return state;

}
