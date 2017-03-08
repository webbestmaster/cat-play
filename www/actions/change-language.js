import actionConst from '../const';

const CHANGE_LANGUAGE = actionConst.LANGUAGE.CHANGE_LANGUAGE;

import i18n from './../services/i18n';

export default function changeLanguage(localeName) {

    i18n.setLang(localeName);

    return {
        type: CHANGE_LANGUAGE,
        localeName: localeName
    };

}
