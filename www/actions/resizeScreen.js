import actionConst from '../const';

const RESIZE = actionConst.TYPE.RESIZE;

export default function resizeScreen() {

    return {
        type: RESIZE
    };
}
