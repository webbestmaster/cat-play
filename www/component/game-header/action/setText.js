import HEADER_CONST from './../const';
const {SET_TEXT} = HEADER_CONST.TYPE;

export default function setText(text) {

    return {
        type: SET_TEXT,
        text: text
    };

}
