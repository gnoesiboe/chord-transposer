var appDispatcher = require('./../utility/appDispatcher'),
    actionConstants = require('./../constants/actionConstants'),
    displayTypeConstants = require('./../constants/displayTypeConstants'),
    store = require('store');

/**
 * @constant
 *
 * @type {string}
 */
var STORE_NAMESPACE = 'context';

/**
 * @type {Object}
 *
 * @private
 */
var _context = store.get(STORE_NAMESPACE, {
    currentTransposition: 3,
    currentCapo: 0,
    currentDisplayType: displayTypeConstants.SHARP
});

/**
 * @type {Array}
 *
 * @private
 */
var _changeListeners = [];

/**
 * @param {Object} action
 *
 * @private
 */
var _handleUpdateTranspositionAction = function (action) {
    _context.currentTransposition = action.newValue;

    _persistState();

    _emitChange();
};

/**
 * @param {Object} action
 *
 * @private
 */
var _handleUpdateCapoAction = function (action) {
    _context.currentCapo = action.newValue;

    _persistState();

    _emitChange();
};

/**
 * @param {Object} action
 *
 * @private
 */
var _handleChangeDisplayTypeAction = function (action) {
    _context.currentDisplayType = action.newValue;

    _persistState();

    _emitChange();
};

appDispatcher.register(function (action) {
    switch(action.type) {
        case actionConstants.UPDATE_TRANSPOSITION:
            _handleUpdateTranspositionAction(action);
            break;

        case actionConstants.CHANGE_DISPLAY_TYPE:
            _handleChangeDisplayTypeAction(action);
            break;

        case actionConstants.UPDATE_CAPO:
            _handleUpdateCapoAction(action);
            break;

        default:
            // action not relevant for this store
            break;
    }
});

/**
 * @private
 */
var _persistState = function () {
    store.set(STORE_NAMESPACE, _context);
};

/**
 * @private
 */
var _emitChange = function () {
    for (var i = 0, l = _changeListeners.length; i < l; i++) {
        _changeListeners[i]();
    }
};

module.exports = {

    /**
     * @returns {number}
     */
    getCapo: function () {
        return _context.currentCapo;
    },

    /**
     * @returns {number}
     */
    getCurrentTransposition: function () {
        return _context.currentTransposition;
    },

    /**
     * @returns {string}
     */
    getCurrentDisplayType: function () {
        return _context.currentDisplayType;
    },

    /**
     * @param {Function} callback
     */
    registerOnChangeListener(callback) {
        _changeListeners.push(callback);
    }
};
