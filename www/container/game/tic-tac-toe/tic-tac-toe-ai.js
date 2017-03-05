import CONST from './tic-tac-toe-const';
import util from './../../../services/util';
import TreeNode from './../../../ai/tree-node';
import BaseModel from './../../../core/Base-model';

const CONST_empty = CONST.empty;
const CONST_X = CONST.X;
const CONST_O = CONST.O;
const CONST_X_CONST_O = [CONST_O, CONST_X];

export default class TicTacToeAi extends BaseModel {

    constructor(args) {

        super(args);

        // const model = this;

        // model.set(CONST.ai.whoWin.key, whoWin);

    }

    getDeep() {
        return this.get(CONST.ai.deep.key);
    }

    setDeep(deep) {
        return this.set(CONST.ai.deep.key, deep);
    }

    getWeapon() {
        return this.get(CONST.ai.weapon.key);
    }

    setWeapon(weapon) {
        return this.set(CONST.ai.weapon.key, weapon);
    }

    getTurn(field) {

        const model = this;

        const myWeapon = model.getWeapon();

        return model.getTree(field).then(treeNode => {

            const winFiltered = [];
            const drawFiltered = [];
            const defeatFiltered = [];
            let resultFiltered;

            treeNode.getAll().forEach(treeNode => {

                const winnerWeapon = whoWin(treeNode.getState(), CONST_X_CONST_O);

                if (winnerWeapon === myWeapon) {
                    return winFiltered.push(treeNode);
                }

                if (winnerWeapon === null) {
                    return drawFiltered.push(treeNode);
                }

                defeatFiltered.push(treeNode);

            });

            if (winFiltered.length) {
                resultFiltered = winFiltered;
            } else if (drawFiltered.length) {
                resultFiltered = drawFiltered;
            } else {
                resultFiltered = defeatFiltered;
            }

            resultFiltered = resultFiltered.sort((a, b) => a.getDeep() - b.getDeep());
            let resultDeep = resultFiltered[0].getDeep();
            return util.shuffle(
                resultFiltered.filter(node => node.getDeep() === resultDeep)
            )[0];

        });


    }

    getTree(field) {

        const model = this;
        const treeNode = new TreeNode(field);
        const deep = model.getDeep();
        const weapon = model.getWeapon();

        return model.growTreeNode(treeNode, weapon, deep);

    }

    growTreeNode(treeNode, weapon, deep) {

        if (deep === 0) {
            return Promise.resolve();
        }

        const model = this;
        const state = treeNode.getState();

        // treeNode is win or defeat - do not grow up
        if (whoWin(state, CONST_X_CONST_O) !== null) {
            return Promise.resolve();
        }

        return getAvailableStates(state, weapon)
            .then(availableStates => {

                for (let i = 0, len = availableStates.length; i < len; i += 1) {
                    treeNode.createChildFromState(availableStates[i]);
                }

                const nextDeep = deep - 1;
                const nextWeapon = weapon === CONST_X ? CONST_O : CONST_X;

                return Promise.all(treeNode.getChildren().map(treeNode => model.growTreeNode(treeNode, nextWeapon, nextDeep)));

            })
            .then(() => treeNode);

    }

}


function compareFields(nodeFrom, nodeTo) {

    const result = [];
    const width = nodeFrom.length;
    const height = nodeFrom[0].length;
    let x, y;

    for (x = 0; x < width; x += 1) {
        result[x] = [];
        for (y = 0; y < height; y += 1) {
            result[x][y] = nodeFrom[x][y] === nodeTo[x][y];
        }
    }

}

function getAvailableStates(field, weapon) {

    // TODO:
    // эта штука работает с лево на право и с верху в низ
    // получается что правые нижние варианты будут покрыты в последнию очередь
    // сделать алгоритм что бы направление генерации выбиралось случайно

    return new Promise((resolve, reject) => {

        const result = [];

        let x, y, width, height, column, fieldCopy;

        for (x = 0, width = field.length; x < width; x += 1) {
            column = field[x];
            for (y = 0, height = column.length; y < height; y += 1) {
                if (column[y] === CONST_empty) {
                    fieldCopy = util.copyArrayOfArrays(field);
                    fieldCopy[x][y] = weapon;
                    result[result.length] = fieldCopy;
                }
            }
        }

        setTimeout(() => resolve(result), 0);

    });

}

function isWin(field, weapon) {

    // check column
    // check row
    // check diagonal
    const lines = [].concat(
        extractColumns(field),
        extractRows(field),
        extractDiagonals(field)
    );

    let i = lines.length;

    while (i--) {
        if (isWinLine(lines[i], weapon)) {
            return true;
        }
    }

    return false;

}

function whoWin(field, weapons) {

    let i = weapons.length,
        weapon;

    while (i--) {

        weapon = weapons[i];

        if (isWin(field, weapon)) {
            return weapon;
        }

    }

    return null;

}

function isWinLine(line, weapon) {

    let i = line.length;

    while (i--) {
        if (line[i] !== weapon) {
            return false;
        }
    }

    return true;

}

function extractColumn(field, index) {
    return field[index].slice();
}

function extractColumns(field) {
    return util.copyArrayOfArrays(field);
}

function extractRow(field, index) {
    return field.map(column => column.filter((ceil, i) => i === index)[0]);
}

function extractRows(field) {
    return field.map((colimn, i) => extractRow(field, i));
}

function extractDiagonal(field, number) {

    switch (number) {

        case 0:

            return field.map((column, x) => column.filter((ceil, y) => x === y)[0]);

            break;

        case 1:

            const width = field.length - 1;

            return field.map((column, x) => column.filter((ceil, y) => (width - x) === y)[0]);

            break;

        default:
            throw 'CAN NOT EXTRACT DIAGONAL'

    }

}

function extractDiagonals(field) {
    return [0, 1].map(i => extractDiagonal(field, i));
}

function getConfigByDifficult(difficult) {

    let deep;

    switch (difficult) {

        case CONST.ai.difficult.ease:
            deep = 1;
            break;

        case CONST.ai.difficult.normal:
            deep = 3;
            break;

        case CONST.ai.difficult.hard:
            deep = 5;
            break;

        default:
            throw 'CAN NOT RESOLVE DIFFICULT';

    }

    return {
        [CONST.ai.deep.key]: deep
    }

}


// tests
(function () {

    return;
    const arr = [
        [5, 7, 11],
        [13, 17, 19],
        [23, 29, 31],
    ];

    console.log(extractColumn(arr, 0));
    console.log(extractColumns(arr));

    console.log(extractRow(arr, 0));
    console.log(extractRows(arr));

    console.log(extractDiagonal(arr, 0));
    console.log(extractDiagonals(arr));

    console.log(isWin(arr));


}());

