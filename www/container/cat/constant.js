import textConstant from './component/text-constant';

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
/*
            behaviour: {
                value: 'state.behaviour.value',
                none: 'state.behaviour.none',
                greeting: 'state.behaviour.greeting',
                selectGame: 'state.behaviour.selectGame'
            },
*/
            is: {
                texting: 'state.is.texting'
            }
        },
        tween: {
            moveToAnimated: 'tween.moveToAnimated',
            texting: 'tween.texting'
        },
        text: {
/*
            sequenceType: {
                value: 'text.sequenceType.value',
                sequence: 'text.sequenceType.sequence',
                random: 'text.sequenceType.random'
            },
*/
            promise: {
                sequence: {
                    promise: 'text.promise.sequence.promise',
                    resolve: 'text.promise.sequence.resolve',
                    reject: 'text.promise.sequence.reject'
                }
            },
            current: 'text.current',
            currentTextIndex: 'text.currentTextIndex',

            // welcome: 'text.welcome',
            welcomeTextList: [
                'Hello! My name is XyberCat!\n' + textConstant.mark.tac + '----------\nTap my face to continue.',
                'How are you?',
                'Any Way I want to play with you!'
                // 'The Game Has Begun!'
            ],
            // selectGame: 'text.selectGame',
            selectGameTextList: [
                'Select a game!',
                'Select a game!\n' + textConstant.mark.tac + 'NOW!!!\n'
            ],
            randomPhraseTextList: [
                'чё?',
                'Я насцу тебе в тапки пока ты будешь спать...',
                'И?...',
                'хм... Хватит кликать'
            ]
        },
        node: {
            width: 'node.width',
            height: 'node.height',
            halfWidth: 'node.halfWidth',
            halfHeight: 'node.halfHeight'
        }
    }
};
