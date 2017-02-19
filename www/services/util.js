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
    }

};

