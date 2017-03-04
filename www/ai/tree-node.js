
export default class TreeNode {

    constructor() {

        this._state = null;
        this._children = [];

    }

    getState() {
        return this._state;
    }

    setState(state) {
        this._state = state;
        return this;
    }

    createChildFromState(state) {

        const treeNode = this;

        const newTreeNode = new TreeNode();

        newTreeNode.setState(state);

        treeNode.addChild(newTreeNode);

    }

    getChildren() {
        return this._children;
    }

    addChild(child) {

        const treeNode = this;

        treeNode.getChildren().push(child);

        return treeNode;

    }




}
