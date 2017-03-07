import BaseModel from './../core/Base-model';


export default class TreeNode extends BaseModel {

    constructor(state) {

        super();

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

    findNodes(filter) {

        const result = [];

        findNodes(this, filter, result);

        return result;

    }

    where(filter) {

        const treeNode = this;
        const result = filter(treeNode) ? [treeNode] : [];

        where(treeNode, filter, result);

        return result;

    }

    walk(fn) {

        walk(this, fn);

    }

    getAll() {

        const treeNode = this;

        const result = [treeNode];

        getAll(treeNode, result);

        return result;

    }

    hasChildren() {
        return !!this.getChildren().length;
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


function findNodes(treeNode, filter, result) {

    if (!treeNode.hasChildren()) {
        return result;
    }

    treeNode.getChildren().forEach(child => {

        if (filter(child)) {
            result.push(child);
        }

        findNodes(child, filter, result);

    });

}


function walk(treeNode, fn) {

    treeNode.getChildren().forEach(child => {
        fn(child);
        walk(child, fn);
    });

}