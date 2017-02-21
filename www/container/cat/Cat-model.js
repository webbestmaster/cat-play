/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import BaseModel from './../../core/Base-model';
import {TimelineLite, Power0} from 'gsap';
import util from './../../services/util';
import textConstant from './component/text-constant';

const CONST = {
    screen: {
        width: 'screen.width',
        height: 'screen.height',
    },
    corner: {
        node: 'corner.model',
        screen: 'corner.screen'
    },
    state: {
        is: {
            texting: 'state-is-texting'
        }
    },
    tween: {
        moveToAnimated: 'tween.moveToAnimated',
        texting: 'tween.texting'
    },
    text: {
        welcome: 'welcomeTextList',
        welcomeTextList: [
            'Hello! My name is XyberCat!\n' + textConstant.mark.tac + '----------\nTap my face to continue.',
            'How are you?',
            'Any Way I want to play with you!'
            // 'The Game Has Begun!'
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
        const screenCornerXy = util.getXyOfCorner(cornerScreen, screenWidth, screenHeight);
        const nodeCornerXy = util.getXyOfCorner(cornerModel, nodeWidth, nodeHeight);

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

    bindEventListeners() {

        const model = this;

        model.onChange(
            ['x', 'y'],
            model.moveTo,
            model
        );

        model.onChange(
            [CONST.screen.width, CONST.screen.height],
            function () {
                model.updateNodeSize();
                model.updateCornerAboutScreen();
            },
            model
        );

        model.onChange(CONST.state.is.texting, function (isTexting) {

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

        model.onChange([CONST.corner.node, CONST.corner.screen], function () {
            model.updateCornerAboutScreen();
        }, model);

    }

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