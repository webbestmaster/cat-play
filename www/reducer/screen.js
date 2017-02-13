import appConst from '../const';

const doc = document;
const docElem = doc.documentElement;

const initialState = {
    width: docElem.clientWidth,
    height: docElem.clientHeight,
    isTouch: 'ontouchstart' in doc
};

const RESIZE = appConst.TYPE.RESIZE;

export default function screen(state = initialState, action) {

    if (action.type === RESIZE) {
        return {
            ...state,
            width: docElem.clientWidth,
            height: docElem.clientHeight
        };
    }

    return state;

}
