/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import BaseModel from './../../core/Base-model';
import {TimelineLite, Power0} from 'gsap';
import util from './../../services/util';

const CONST = {
    tween: {
        moveTo: 'tween.moveTo'
    },
    text: {
        welcome: 'welcomeTextList',
        welcomeTextList: [
            'Hello! My name is XyberCat! \n----------\n Tap my face to continue.',
            'How are you?',
            'Any Way I want to play with you!',
            'The Game Has Begun!'
        ]
    },
    node: {
        width: 'node.width',
        height: 'node.height',
        halfWidth: 'node.halfWidth',
        halfHeight: 'node.halfHeight'
    }
};

export default class CatModel extends BaseModel {

    constructor(args) {

        super(args);

        this.const = CONST;

        this.set(CONST.text.welcome, util.copyHashMap(CONST.text.welcomeTextList));

    }

    bindEventListeners() {

        const model = this;

        model.onChange(
            ['x', 'y'],
            model.moveTo,
            model
        );

        model.onChange(
            [CONST.node.width, CONST.node.height],
            function () {

                let model = this;
                let style = model.get('view').refs.wrapper.style;
                let width = model.get(CONST.node.width);
                let height = model.get(CONST.node.height);

                style.width = width + 'px';
                style.height = height + 'px';

                model.set({
                    [CONST.node.halfWidth]: Math.round(width / 2),
                    [CONST.node.halfHeight]: Math.round(height / 2)
                });

            },
            model
        );

    }

    moveTo() {

        console.log('---> moveTo', this.getAllAttributes());

        const model = this;
        const x = model.get('x');
        const y = model.get('y');
        const view = model.get('view');
        const nodeHalfWidth = model.get(CONST.node.halfWidth);
        const nodeHalfHeight = model.get(CONST.node.halfHeight);

        view.refs.wrapper.style[util.prefix.js + 'Transform'] = 'translate3d(' + (x - nodeHalfWidth) + 'px,' + (y - nodeHalfHeight) + 'px, 0)';

    }

    destroy() {

        let model = this;


        Object.keys(CONST.tween).forEach(tweenName => {

            let tween = model.get(CONST.tween[tweenName]);

            if (!tween) {
                return;
            }

            tween.progress(1);
            tween.kill();

        });

        super.destroy();

    }


}