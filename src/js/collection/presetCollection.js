/**
 * @param {Array} items
 *
 * @constructor
 */
var PresetCollection = function (items) {

    /**
     * @type {Array}
     *
     * @private
     */
    this._presets = items;
};

/**
 * @param {Function} callback
 */
PresetCollection.prototype.each = function (callback) {
    for (var i = 0, l = this._presets.length; i < l; i++) {
        callback(this._presets[i]);
    }
};

/**
 * @param {String} id
 *
 * @returns {Preset|null}
 */
PresetCollection.prototype.findOneById = function (id) {
    for (var i = 0, l = this._presets.length; i < l; i++) {
        var preset = this._presets[i];

        if (preset.id === id) {
            return preset;
        }
    }

    return null;
};

module.exports = PresetCollection;
