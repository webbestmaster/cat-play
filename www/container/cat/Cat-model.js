/**
 * Created by dmitriy.turovtsov on 2/14/17.
 */

import BaseModel from './../../core/Base-model';

export default class CatModel extends BaseModel {

    constructor() {
        super();
    }

    moveTo(x, y) {
        this.set({x, y});
    }

}