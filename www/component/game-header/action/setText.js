import HEADER_CONST from './../const';
const {SET_TEXT} = HEADER_CONST.TYPE;

function noop() { console.log('nooop!!') }

export default function setText(text, callback = noop) {

    return {
        type: SET_TEXT,
        text,
        callback
    };

}
