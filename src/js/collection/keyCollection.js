/**
 * @param {Array} items
 *
 * @constructor
 */
var KeyCollection = function (items) {

    /**
     * @type {Array}
     */
    this._presets = items;
};

/**
 * @param {String} key
 *
 * @returns {Number}
 */
KeyCollection.prototype.indexOf = function (key) {
    for (var i = 0, l = this._presets.length; i < l; i++) {
        var item = this._presets[i];

        if (item.flat === key || item.sharp === key) {
            return i;
        }
    }

    return -1;
};

/**
 * @param {Number} index
 *
 * @returns {Key}
 */
KeyCollection.prototype.get = function (index) {
    return this._presets[index];
};

/**
 * @return {Number}
 */
KeyCollection.prototype.count = function () {
    return this._presets.length;
};

module.exports = KeyCollection;
