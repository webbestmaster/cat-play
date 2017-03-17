
export default {
    type: {
        showText: 'cat-action-show-text',
        setTexting: 'cat-action-set-texting'
    },
    model: {
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
                texting: 'state.is.texting'
            }
        },
        tween: {
            moveToAnimated: 'tween.moveToAnimated',
            texting: 'tween.texting'
        },
        text: {
            promise: {
                sequence: {
                    promise: 'text.promise.sequence.promise',
                    resolve: 'text.promise.sequence.resolve',
                    reject: 'text.promise.sequence.reject'
                }
            },
            current: 'text.current',
            currentTextIndex: 'text.currentTextIndex',
        },
        node: {
            width: 'node.width',
            height: 'node.height',
            halfWidth: 'node.halfWidth',
            halfHeight: 'node.halfHeight'
        }
    }
};
