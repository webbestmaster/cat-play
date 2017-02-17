/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import BaseModel from './../../core/Base-model';
import {TimelineLite, Power0} from 'gsap';

const CONST = {
    tween: {
        moveTo: 'tween.moveTo'
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
                    [CONST.node.halfWidth]: Math.round( width / 2),
                    [CONST.node.halfHeight]: Math.round( height / 2)
                });

            },
            model
        );

    }

    moveTo() {

        console.log('---> moveTo', this.getAllAttributes());

        let time = 2;

        const model = this;
        const x = model.get('x');
        const y = model.get('y');
        const view = model.get('view');
        const nodeHalfWidth = model.get(CONST.node.halfWidth);
        const nodeHalfHeight = model.get(CONST.node.halfHeight);

        let tl = new TimelineLite();

        let prevTween = model.get(CONST.tween.moveTo);

        if (prevTween) {
            prevTween.pause();
            prevTween.kill();
        }

        model.set(
            CONST.tween.moveTo,
            tl.to(view.refs.wrapper, time, {x: x - nodeHalfWidth, y: y - nodeHalfHeight, ease: Power0.easeNone})
        );

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