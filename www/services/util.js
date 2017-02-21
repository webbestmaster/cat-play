/*global window*/
const win = window;
const doc = win.document;
const docElem = doc.documentElement;

// initializing
const prefix = (function () {
    let styles = win.getComputedStyle(docElem, ''),
        pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1];
    return {
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
    };
})();

export default  {

    prefix,

    copyHashMap: function (hashMap) {
        return JSON.parse(JSON.stringify(hashMap));
    },

    getXyOfCorner: function (corner, width, height) {

        const result = {
            x: 0,
            y: 0
        };

        switch (corner) {
            case 2:
                result.x = width / 2;
                break;

            case 3:
                result.x = width;
                break;
            case 4:
                result.y = height / 2;
                break;
            case 5:
                result.x = width / 2;
                result.y = height / 2;
                break;
            case 6:
                result.x = width;
                result.y = height / 2;
                break;
            case 7:
                result.y = height;
                break;
            case 8:
                result.x = width / 2;
                result.y = height;
                break;
            case 9:
                result.x = width;
                result.y = height;
                break;
        }

        return result;

    }

};

