
class Node {

    constructor() {

        this._beginState = null;
        this._children = [];

    }

    setBeginState(state) {
        this._beginState = state;
        return this;
    }

    getBeginState() {
        return this._beginState;
    }

    getChildren() {
        return this._children;
    }

    getChild(index) {
        return this.getChildren()[index];
    }

    addChild(child) {
        this.getChildren().push(child);
        return this;
    }


}


