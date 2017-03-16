import CONST from '../const';

const SHOW_BUTTONS = CONST.SHOW_BUTTONS;

export default function showButtonsAction(showOrHide) {

    return {
        type: SHOW_BUTTONS,
        isShowButtons: showOrHide
    };

}
