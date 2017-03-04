
export default class TreeNode {

    constructor(state) {

        const treeNode = this;

        treeNode.setState(state);

        treeNode._children = [];

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

        const newTreeNode = new TreeNode(state);

        treeNode.addChild(newTreeNode);

    }

    getChildren() {
        return this._children;
    }

    addChild(child) {

        const treeNode = this;

        const children = treeNode.getChildren();

        children[children.length] = child;

        return treeNode;

    }

}
