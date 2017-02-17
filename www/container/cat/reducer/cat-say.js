import CONST from './../constant';

const catSayType = CONST.action.type.say;

export default function reducerSay(state = {}, action) {

    if (action.type === catSayType) {
        return {
            ...state,
            text: action.text
        };
    }

    return state;

}
