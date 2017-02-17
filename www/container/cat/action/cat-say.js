import CONST from './../constant';

const catSayType = CONST.action.type.say;

export default function say(text) {

    return {
        type: catSayType,
        text: text
    };

}
