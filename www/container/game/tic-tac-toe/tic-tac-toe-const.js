
const X = 'X';
const O = 'O';
const EMPTY = 'EMPTY';

export default {

    empty: EMPTY,
    X: X,
    O: O,

    players: {
        key: 'players.key'
    },

    player: {
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
    }


};




