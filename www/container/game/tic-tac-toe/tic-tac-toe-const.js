
const X = 'X';
const O = 'O';
const EMPTY = 'empty';

export default {

    empty: EMPTY,
    X: X,
    O: O,

    model: {
        isOnClickEnabled: {
            key: 'model.isOnClickEnabled.key',
            enabled: 'model.isOnClickEnabled.enabled',
            disabled: 'model.isOnClickEnabled.disabled'
        }
    },

    players: {
        key: 'players.key'
    },

    player: {
        score: {
            key: 'player.score.key'
        },
        current: {
            id: 'player.current.id'
        },
        weapon: {
            key: 'player.weapon.key',
            X: X,
            O: O
        },
        mind: {
            key: 'player.mind.key',
            CPU: 'player.mind.CPU',
            Human: 'player.mind.Human'
        }
    },

    field: {
        object: 'field.object',
        width: 'field.width',
        height: 'field.height'
    },
    current: {
        state: 'current.state'
    },
    ai: {
        deep: {
            key: 'ai.deep.key'
        },
        weapon: {
            key: 'ai.weapon.key'
        },
        difficult: {
            key: 'ai.difficult.key',
            ease: 'ai.difficult.ease',
            normal: 'ai.difficult.normal',
            hard: 'ai.difficult.hard'
        },
        whoWin: {
            key: 'ai.whoWin.key'
        }
    },

    gameLimit: {
        key: 'gameLimit.key',
        max: 10
    },

    src: {
        [X]: './img/x.svg',
        [O]: './img/o.svg',
        [EMPTY]: './img/empty.svg'
    },

    SET_READY_TO_PLAY: 'SET_READY_TO_PLAY',
    DRAW_TURN_ON_FIELD: 'DRAW_TURN_ON_FIELD',
    DRAW_NEW_COUNT: 'DRAW_NEW_COUNT'

};




