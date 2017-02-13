const Promise = require('es6-promise-polyfill').Promise;

const VALUES = {
    DB_PROPERTY_NAME: 'DB_PROPERTY_NAME'
};

const DB_PROPERTY_NAME = VALUES.DB_PROPERTY_NAME;

export default class DB {

    constructor(dbName = 'DB-default-name',
                version = '0.1',
                description = 'DB default description',
                size = 1024 * 1024) {

        let db = openDatabase(dbName, version, description, size);

        if (!db) {
            throw 'DATA BASE IS NOT CONNECTED!';
        }

        let dbMaster = this;

        dbMaster._attr = {};

        dbMaster.setProperty(DB_PROPERTY_NAME, db);

    }

    getProperty(key) {
        return this._attr[key];
    }

    setProperty(key, value) {
        let dbMaster = this;
        dbMaster._attr[key] = value;
        return dbMaster;
    }

    createTable(tableName, fields) {

        return new Promise((resolve, reject) => {

            if (!tableName || !fields) {
                reject('Table name and fields is required!');
            }

            let db = this.getProperty(DB_PROPERTY_NAME);

            db.transaction(function (tx) {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (${fields})`, [], resolve, reject);
            });

        });

    }

    create(tableName, fieldsName, fieldsValue) {

        return new Promise((resolve, reject) => {

            if (!tableName || !fieldsName || !fieldsName) {
                reject('Table name, fields name and fields value is required!');
            }

            let db = this.getProperty(DB_PROPERTY_NAME);

            db.transaction(function (tx) {
                tx.executeSql(`INSERT INTO ${tableName} (${fieldsName}) VALUES (` + fieldsValue.map(() => '?') + ')', fieldsValue, resolve, reject);
            });

        });

    }

    read(tableName, selectorKey, selectorValue) {

        return new Promise((resolve, reject) => {

            if (!tableName || !selectorKey || !selectorValue) {
                reject('Table name and selector is required!');
            }

            let db = this.getProperty(DB_PROPERTY_NAME);

            db.transaction(function (tx) {
                tx.executeSql(`SELECT * FROM ${tableName} WHERE ${selectorKey}=?`, [selectorValue], (tx, result) => resolve(result.rows), reject);
            });

        });

    }

    update(tableName, fieldName, fieldValue, selectorKey, selectorValue) {

        return new Promise((resolve, reject) => {

            if (!tableName || !fieldName || !fieldValue || !selectorKey) {
                reject('Table name, field name, fields value and selector is required!');
            }

            let db = this.getProperty(DB_PROPERTY_NAME);

            db.transaction(function (tx) {
                tx.executeSql(`UPDATE ${tableName} SET ${fieldName}=? WHERE ${selectorKey}=?`, [fieldValue, selectorValue], resolve, reject);
            });

        });

    }

    delete(tableName, selectorKey, selectorValue) {

        return new Promise((resolve, reject) => {

            if (!tableName || !selectorKey || !selectorValue) {
                reject('Table name and selector is required!');
            }

            let db = this.getProperty(DB);

            db.transaction(function (tx) {
                tx.executeSql(`DELETE FROM ${tableName} WHERE ${selectorKey}=?`, [selectorValue], resolve, reject);
            });

        });

    }

}
