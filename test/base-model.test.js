/*global describe, it, beforeEach, afterEach */

const assert = require('chai').assert;

const BaseModel = require('./../www/core/Base-model');

describe('Base model', function () {

    let model;

    beforeEach(() => model = new BaseModel());

    afterEach(() => model.destroy());


    it('constructor', () => {

        model = new BaseModel({prop: 'value'});
        assert(model.get('prop') === 'value');

    });


    it('set/get', () => {

        model.set('key-1', 'value-1');
        assert(model.get('key-1') === 'value-1');

        model.set({'key-2': 'value-2'});
        assert(model.get('key-2') === 'value-2');

    });


    it('onChange key/value, object', () => {

        let changeMyKey = {
            key: ''
        };

        // check key value change
        model.onChange('keyValueChange', function () {
            this.key = 'keyValueChange';
        }, changeMyKey);

        model.set('keyValueChange', 'newKeyValue');

        assert(changeMyKey.key === 'keyValueChange');


        // check object change
        model.onChange('objectChange', function () {
            this.key = 'newObjectValue';
        }, changeMyKey);

        model.set({objectChange: 'newObjectValue'});

        assert(changeMyKey.key === 'newObjectValue');

    });


    it('onChange passed params', () => {

        let paramNewValue, paramOldValue;

        model.set({checkParam: 'oldCheckParam'});

        // check passed params
        model.onChange('checkParam', (newValue, oldValue) => {
            paramNewValue = newValue;
            paramOldValue = oldValue;
        });

        model.set('checkParam', 'newCheckParam');

        assert(paramNewValue === 'newCheckParam');
        assert(paramOldValue === 'oldCheckParam');

    });


    it('offChange', () => {

        let counter = 0;

        function paramOnePass() {
            counter += 1;
        }
        function paramTwoPass() {
            counter += 10;
        }
        function paramThreePass() {
            counter += 100;
        }

        model.onChange('paramOnePass', paramOnePass);
        model.offChange('paramOnePass');
        model.trigger('paramOnePass');

        model.onChange('paramTwoPass', paramTwoPass);
        model.onChange('paramTwoPass', () => paramTwoPass()); // should add 10
        model.offChange('paramTwoPass', paramTwoPass);
        model.trigger('paramTwoPass');

        model.onChange('paramThreePass', paramThreePass, this);
        model.onChange('paramThreePass', () => paramThreePass()); // should add 100
        model.onChange('paramThreePass', () => paramThreePass(), {}); // should add 100
        model.offChange('paramThreePass', paramThreePass, this);
        model.trigger('paramThreePass');

        assert(counter === 210);

    });


    it('trigger', () => {

        let paramNewValue, paramOldValue;

        model.set('triggerParam', 'triggerValue');

        model.onChange('triggerParam', (newValue, oldValue) => {
            paramNewValue = newValue;
            paramOldValue = oldValue;
        });

        model.trigger('triggerParam');

        assert(paramNewValue === 'triggerValue');
        assert(paramOldValue === 'triggerValue');

    });


    it('do not extra trigger', () => {

        let shouldBeTrue = true;

        model.set({checkParam: 'checkValue'});

        // check passed params
        model.onChange('checkParam', () => {
            shouldBeTrue = false;
        });

        model.set('checkParam', 'checkValue');

        assert(shouldBeTrue);

    });


    it('destroy', () => {

        model.set({anyParam: 'anyValue'});

        model.onChange('anyParam', () => {});

        model.destroy();

        assert.deepEqual(model.getAllListeners(), {});
        assert.deepEqual(model.getAllAttributes(), {});

    });

});
