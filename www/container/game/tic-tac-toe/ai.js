/**
 *
 * @param field - array of arrays
 * @param typeOfPlayer - X or O
 */

import CONST from './tic-tac-toe-const';
import util from './../../../services/util';
import TreeNode from './../../../ai/tree-node';

const CONST_empty = CONST.empty;
const CONST_X = CONST.X;
const CONST_O = CONST.O;

function getTurn(field, typeOfPlayer) {

    const treeNode = new TreeNode(field);

    getTree(treeNode, typeOfPlayer, 8).then(result => {
        console.log(result);
        console.log(treeNode);
    });

}

function getTree(treeNode, typeOfPlayer, deep) {

    if (deep === 0) {
        return Promise.resolve();
    }

    return getAvailableStates(treeNode.getState(), typeOfPlayer)
        .then(availableStates => {

            for (let i = 0, len = availableStates.length; i < len; i += 1) {
                treeNode.createChildFromState(availableStates[i]);
            }

            const nextDeep = deep - 1;
            const nextTypeOfPlayer = typeOfPlayer === CONST_X ? CONST_O : CONST_X;

            return Promise.all(treeNode.getChildren().map(treeNode => getTree(treeNode, nextTypeOfPlayer, nextDeep)));

        })
        .then(() => treeNode);

}

function getAvailableStates(field, typeOfPlayer) {

    return new Promise((resolve, reject) => {

        const result = [];

        let x, y, width, height, column, fieldCopy;

        for (x = 0, width = field.length; x < width; x += 1) {
            column = field[x];
            for (y = 0, height = column.length; y < height; y += 1) {
                if (column[y] === CONST_empty) {
                    fieldCopy = util.copyArrayOfArrays(field);
                    fieldCopy[x][y] = typeOfPlayer;
                    result[result.length] = fieldCopy;
                }
            }
        }

        setTimeout(() => resolve(result), 0);

    });

}

export default getTurn;
