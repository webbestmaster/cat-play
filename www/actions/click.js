import actionConst from '../const';

const CLICK = actionConst.TYPE.CLICK;

export default function click(e) {

    return {
        type: CLICK,
        x: e.pageX,
        y: e.pageY
    };

}
