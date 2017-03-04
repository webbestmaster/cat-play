/**
 *
 * @param field - array of arrays
 * @param typeOfPlayer - X or O
 */

import CONST from './tic-tac-toe-const';
import util from './../../../services/util';
import TreeNode from './../../../ai/tree-node';

function getTurn(field, typeOfPlayer) {

    const treeNode = new TreeNode();

    treeNode.setState(field);

    const tree = getTree(treeNode, typeOfPlayer, 15);

    debugger;

}

function getTree(treeNode, typeOfPlayer, deep) {

    if (deep === 0) {
        return treeNode;
    }

    getAvailableStates(
        treeNode.getState(),
        typeOfPlayer
    )
        .forEach(state => treeNode.createChildFromState(state));

    treeNode.getChildren().forEach(treeNode => {
        getTree(treeNode, switchTypeOfPlayer(typeOfPlayer), deep - 1);
    });

    return treeNode;

}

function switchTypeOfPlayer(typeOfPlayer) {
    return typeOfPlayer === CONST.X ? CONST.O : CONST.X;
}

function getAvailableStates(field, typeOfPlayer) {

    const result = [];

    field.forEach((column, x) => column.forEach((ceil, y) => {

        if (ceil !== CONST.empty) {
            return;
        }

        const fieldCopy = util.copyHashMap(field);
        fieldCopy[x][y] = typeOfPlayer;
        result.push(fieldCopy);

    }));

    return result;

}


export default getTurn;









