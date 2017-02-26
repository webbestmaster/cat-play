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

const util = {

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

    },

    // [start, end] - start and end value will be included
    getRandom(start, end) {

        if (end === undefined) {
            end = start;
            start = 0;
        }

        end += 1;

        return Math.floor(Math.random() * (end - start) + start);

    },

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    },

    copyShuffle(array) {
        return util.shuffle(util.copyHashMap(array));
    },

    addToGlobalScope(name, value) {

        console.log(win.gs = win.gs || {});

        console.log(name, '- added to global scope (window.gs[youObject])', win.gs[name] = value);

    }

};

export default util;