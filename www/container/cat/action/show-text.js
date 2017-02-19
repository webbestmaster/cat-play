import CONST from './../constant';

const typeShowText = CONST.type.showText;

export default function showText(text) {

    return {
        type: typeShowText,
        text: text
    };

}
