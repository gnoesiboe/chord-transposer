var keyStore = require('./../store/keyStore'),
    displayTypeConstants = require('./../constants/displayTypeConstants'),
    idGenerator = require('./../utility/idGenerator');

/**
 * @param {String} name
 * @param {String=} addition
 *
 * @constructor
 */
var Chord = function (name, addition) {
    this.id = idGenerator.generate();
    this.name = name[0].toUpperCase() + (name.length > 1 ? name.substr(1) : '');
    this.addition = addition || null;
};

/**
 * @param {Number} steps
 * @param {String} displayType
 * @param {Number} capo
 *
 * @returns {String}
 */
Chord.prototype.transpose = function (steps, displayType, capo) {
    var existingKeys = keyStore.getAll(),
        currentKeyIndex = existingKeys.indexOf(this.name);

    if (currentKeyIndex < 0) {
        throw new Error('Not existing key: ' + this.name);
    }

    var newKeyIndex = currentKeyIndex + steps - capo;

    if (newKeyIndex < 0) {
        newKeyIndex = existingKeys.count() - Math.abs(newKeyIndex);
    }

    if (typeof existingKeys.get(newKeyIndex) === 'undefined') {
        newKeyIndex = newKeyIndex - existingKeys.count();
    }

    return existingKeys.get(newKeyIndex)[displayType === displayTypeConstants.FLAT ? 'flat' : 'sharp'];
};

/**
 * @returns {Object}
 */
Chord.prototype.toStore = function () {
    return {
        name: this.name,
        addition: this.addition
    };
};

/**
 * @param {Object} storeData
 *
 * @returns {Chord}
 */
Chord.createFromStoreData = function (storeData) {
    return new Chord(storeData.name, storeData.addition);
};

module.exports = Chord;
