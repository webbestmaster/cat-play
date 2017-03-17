import CONST from './../constant';

const typeShowText = CONST.type.showText;
const typeSetTexting = CONST.type.setTexting;

export function showText(text) {

    return {
        type: typeShowText,
        text: text
    };

}

export function setIsTexting(value) {

    return {
        type: typeSetTexting,
        isTexting: value
    };

}
