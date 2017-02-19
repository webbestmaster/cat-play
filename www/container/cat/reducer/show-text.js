import CONST from './../constant';

const typeShowText = CONST.type.showText;
const typeSetTexting = CONST.type.setTexting;

export function showText(state = {text: ''}, action) {

    if (action.type === typeShowText) {
        return {
            ...state,
            text: action.text
        };
    }

    return state;

}

export function setIsTexting(state = {isTexting: false}, action) {

    if (action.type === typeSetTexting) {
        return {
            ...state,
            isTexting: action.isTexting
        };
    }

    return state;

}
