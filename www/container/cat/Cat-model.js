/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import BaseModel from './../../core/Base-model';
import {TimelineLite, Power0} from 'gsap';
import util from './../../services/util';

import constant from './constant'
const CONST = constant.model;

export default class CatModel extends BaseModel {

    constructor(args) {

        super(args);

        const model = this;

        model.updateShowTextSequencePromise();
        // model.set(CONST.text.sequenceType.value, CONST.text.sequenceType.sequence);

        // model.set(CONST.text.welcome, util.copyHashMap(CONST.text.welcomeTextList));
        // model.set(CONST.text.selectGame, util.copyHashMap(CONST.text.selectGameTextList));

        console.log(util.addToGlobalScope('cat', model));

    }

    /////////
    // Coordinates
    /////////

    updateCornerAboutScreen() {

        const model = this;

        model.set(model.getXyCornerAboutScreen(
            model.get(CONST.corner.node),
            model.get(CONST.corner.screen)
        ));

    }

    updateNodeSize() {

        const model = this;
        const style = model.get('view').refs.wrapper.style;
        const nodeWidth = model.get(CONST.screen.width) / 4;
        const nodeHeight = model.get(CONST.screen.height) / 4;

        const nodeSize = Math.min(nodeWidth, nodeHeight);

        model.set(CONST.node.width, nodeSize);
        model.set(CONST.node.height, nodeSize);

        style.width = Math.round(nodeSize) + 'px';
        style.height = Math.round(nodeSize) + 'px';

        model.set({
            [CONST.node.halfWidth]: Math.round(nodeSize / 2),
            [CONST.node.halfHeight]: Math.round(nodeSize / 2)
        });

    }

    getXyCornerAboutScreen(cornerModel, cornerScreen) {

        const model = this;
        const screenWidth = model.get(CONST.screen.width);
        const screenHeight = model.get(CONST.screen.height);
        const nodeWidth = model.get(CONST.node.width);
        const nodeHeight = model.get(CONST.node.height);
        const screenCornerXy = util.getXyOfCorner(cornerScreen || 5, screenWidth, screenHeight, [screenWidth / 10, screenHeight/ 10]);
        const nodeCornerXy = util.getXyOfCorner(cornerModel || 5, nodeWidth, nodeHeight);

        return {
            x: screenCornerXy.x - nodeCornerXy.x,
            y: screenCornerXy.y - nodeCornerXy.y
        };

    }

    setCornerAboutScreen(cornerModel, cornerScreen) {

        const model = this;

        model.set(CONST.corner.node, cornerModel);
        model.set(CONST.corner.screen, cornerScreen);

        model.updateCornerAboutScreen();

    }

    /////////
    // Listeners
    /////////

    bindEventListeners() {

        const model = this;

        model.onChange(
            ['x', 'y'],
            model.moveTo,
            model
        );

        model.onChange(
            [CONST.screen.width, CONST.screen.height],
            () => {
                model.updateNodeSize();
                model.updateCornerAboutScreen();
            },
            model
        );


        model.onChange(CONST.state.is.texting, isTexting => {

            console.log('isTexting --->', isTexting);

            let oldTl = model.get(CONST.tween.texting),
                imageNode = model.get('view').refs.image;

            if (oldTl) {
                console.log('isTexting ---> KILL');
                oldTl.stop();
                oldTl.progress(0);
                oldTl.kill();
                imageNode.removeAttribute('style');
                model.set(CONST.tween.texting, null);
            }

            if (!isTexting) {
                return;
            }

            let newTl = new TimelineLite();

            newTl.to(imageNode, 0.1, {scaleY: 0.98, repeat: -1, yoyo: true});

            model.set(CONST.tween.texting, newTl);

        }, model);


        model.onChange([CONST.corner.node, CONST.corner.screen], () => {
            model.updateCornerAboutScreen();
        }, model);

    }

    /////////
    // Visualisation
    /////////

    moveTo() {

        console.log('---> moveTo', this.getAllAttributes());

        const model = this;
        const x = model.get('x');
        const y = model.get('y');
        const view = model.get('view');

        view.refs.wrapper.style[util.prefix.js + 'Transform'] = 'translate3d(' + Math.round(x) + 'px,' + Math.round(y) + 'px, 0)';

    }

    moveToAnimated(x, y, time, ease) {

        return new Promise((resolve, reject) => {

            let model = this;
            let oldTl = model.get(CONST.tween.moveToAnimated);

            if (oldTl) {
                oldTl.progress(1);
                oldTl.kill();
            }

            let tl = new TimelineLite({
                onComplete: function () {
                    this.kill();
                    resolve();
                }
            });

            tl.to(model.get('view').refs.wrapper, time, {x, y, ease});

            model.set(CONST.tween.moveToAnimated, tl);

        });

    }

    /////////
    // Texting
    /////////

    showTextSequence(textList) {

        const model = this;

        model.resolveTextSequencePromise();

        model.updateShowTextSequencePromise();

        model.set({
            [CONST.text.current]: textList,
            [CONST.text.currentTextIndex]: -1
        });

        model.showTextNext();

        return model.get(CONST.text.promise.sequence.promise);

    }

    showText(text) {

        const model = this;
        const view = model.get('view');

        view.props.showTextAction(text);

    }

    showTextNext() {

        const model = this;
        const textList = model.get(CONST.text.current);

        if (!textList) {
            return;
        }

        let currentIndex = model.get(CONST.text.currentTextIndex);
        let nextIndex = currentIndex + 1;

        if (textList[nextIndex]) {
            model.set(CONST.text.currentTextIndex, nextIndex);
            model.showText(textList[nextIndex]);
            return;
        }

        model.set(CONST.text.current, null);

        model.showText('');

        console.log('no text more !!!');

        model.resolveTextSequencePromise();

    }

    updateShowTextSequencePromise() {

        const model = this;

        const newPromise = new Promise((resolve, reject) => model.set({
            [CONST.text.promise.sequence.resolve]: resolve,
            [CONST.text.promise.sequence.reject]: reject
        }));

        model.set(CONST.text.promise.sequence.promise, newPromise);

    }

    resolveTextSequencePromise() {

        const model = this;

        const prevPromiseResolver = model.get(CONST.text.promise.sequence.resolve);

        if (prevPromiseResolver) {
            prevPromiseResolver();
        }

        model.set(CONST.text.promise.sequence.resolve, null);

    }

    /////////
    // Destroy
    /////////

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