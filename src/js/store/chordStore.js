var Chord = require('./../model/chord'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionConstants = require('./../constants/actionConstants'),
    store = require('store');

/**
 * @constant
 *
 * @type {string}
 */
var STORE_NAMESPACE = 'chords';

/**
 * @param {Array} storeData
 *
 * @private
 */
var _importChordsFromStore = function (storeData) {
    var out = [];

    for (var i = 0, l = storeData.length; i < l; i++) {
        out.push(Chord.createFromStoreData(storeData[i]));
    }

    return out;
};

/**
 * @type {Array}
 *
 * @private
 */
var _chords = store.has(STORE_NAMESPACE) ? _importChordsFromStore(store.get(STORE_NAMESPACE)) : [];

/**
 * @type {Array}
 *
 * @private
 */
var _changeListeners = [];

/**
 * @private
 */
var _persistCollection = function () {
    var storeData = [];

    for (var i = 0, l = _chords.length; i < l; i++) {
        storeData.push(_chords[i].toStore());
    }

    store.set(STORE_NAMESPACE, storeData);
};

/**
 * @param {Object} action
 *
 * @private
 */
var _handleAddChordAction = function (action) {
    var chord = _createChordFromName(action.name);

    if (chord === null) {
        return;
    }

    _chords.push(chord);

    _persistCollection();

    _emitChange();
};

/**
 * @param {Object} action
 *
 * @private
 */
var _handleRemoveChordAction = function (action) {
    var indexToRemove = null;

    for (var i = 0, l = _chords.length; i < l; i++) {
        if (_chords[i].id === action.id) {
            indexToRemove = i;

            break;
        }
    }

    if (indexToRemove === null) {
        return;
    }

    _chords.splice(indexToRemove, 1);

    _persistCollection();

    _emitChange();
};

/**
 * @param {Object} action
 *
 * @private
 */
var _handleClearChordsAction = function (action) {
    _chords = [];

    _persistCollection();

    _emitChange();
};

/**
 * @private
 */
var _emitChange = function () {
    for (var i = 0, l = _changeListeners.length; i < l; i++) {
        _changeListeners[i]();
    }
};

/**
 * @param {String} name
 *
 * @returns {Chord|null}
 *
 * @private
 */
var _createChordFromName = function (name) {
    var match = name.match(/^([a-g]{1}[#b]{0,1})(.*)$/i);

    if (match === null) {
        return null;
    }

    return new Chord(match[1], match[2]);
};

/**
 * @param {Object} action
 *
 * @private
 */
var _handleApplyChordPresetAction = function (action) {
    for (var i = 0, l = action.chords.length; i < l; i++) {
        var chord = _createChordFromName(action.chords[i]);

        if (chord === null) {
            continue;
        }

        _chords.push(chord);
    }

    _persistCollection();

    _emitChange();
};

appDispatcher.register(function (action) {
    switch (action.type) {
        case actionConstants.ADD_CHORD:
            _handleAddChordAction(action);
            break;

        case actionConstants.REMOVE_CHORD:
            _handleRemoveChordAction(action);
            break;

        case actionConstants.CLEAR_CHORDS:
            _handleClearChordsAction(action);
            break;

        case actionConstants.APPLY_CHORD_PRESET:
            _handleApplyChordPresetAction(action);
            break;

        default:
            // action not relevant for this store
            break;
    }
});

module.exports = {

    /**
     * @param {Function} callback
     */
    registerChangeListener: function (callback) {
        _changeListeners.push(callback);
    },

    /**
     * @returns {Array}
     */
    getAll: function () {
        return _chords;
    }
};
