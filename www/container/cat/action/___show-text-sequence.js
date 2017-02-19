import CONST from './../constant';

const typeShowText = CONST.type.showText;

let sequences = [];

export default function showTextSequence(arr) {

    return {
        type: typeShowText,
        text: arr[0]
    };

}
