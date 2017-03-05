
export default class TreeNode {

    constructor(state) {

        const treeNode = this;

        treeNode.setState(state);

        treeNode._children = [];
        treeNode._parent = null;
        treeNode._deep = 0;

    }

    getParent() {
        return this._parent;
    }

    setParent(treeNode) {
        this._parent = treeNode;
        return this;
    }

    getChainOfParents(result = []) {

        const treeNode = this;

        result.push(treeNode);

        let parent = treeNode.getParent();

        return parent ? parent.getChainOfParents(result) : result;

    }

    getState() {
        return this._state;
    }

    setState(state) {
        this._state = state;
        return this;
    }

    getDeep() {
        return this._deep;
    }

    setDeep(deep) {
        this._deep = deep;
        return this;
    }

    createChildFromState(state) {

        const treeNode = this;

        const newTreeNode = new TreeNode(state);

        treeNode.addChild(newTreeNode);

        return newTreeNode

    }

    getChildren() {
        return this._children;
    }

    addChild(child) {

        const treeNode = this;

        const children = treeNode.getChildren();

        children[children.length] = child;

        child.setParent(treeNode);

        child.setDeep(treeNode.getDeep() + 1);

    }

    where(filter) {

        const treeNode = this;
        const result = filter(treeNode) ? [treeNode] : [];

        where(treeNode, filter, result);

        return result;

    }

    getAll() {

        const treeNode = this;

        const result = [treeNode];

        getAll(treeNode, result);

        return result;

    }

}

function getAll(treeNode, result) {

    treeNode
        .getChildren()
        .forEach(node => {
            result.push(node);
            getAll(node, result);
        });

}

function where(treeNode, filter, result) {

    treeNode
        .getChildren()
        .forEach(node => {
            if (filter(node)) {
                result.push(node);
            }
            where(node, filter, result);
        });

}
