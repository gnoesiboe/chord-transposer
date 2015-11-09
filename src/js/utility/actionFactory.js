var _ = require('underscore'),
    actionConstants = require('./../constants/actionConstants');

/**
 * @type {Object}
 *
 * @private
 */
var _blueprint = {
    type: null
};

/**
 * @type {Object}
 */
var actionFactory = {

    /**
     * @param {String} name
     *
     * @returns {Object}
     */
    buildAddChordAction: function (name) {
        return _.extend({}, _blueprint, {
            type: actionConstants.ADD_CHORD,
            name: name
        });
    },

    /**
     * @param {String} id
     *
     * @returns {Object}
     */
    buildRemoveChordAction: function (id) {
        return _.extend({}, _blueprint, {
            type: actionConstants.REMOVE_CHORD,
            id: id
        });
    },

    /**
     * @returns {Object}
     */
    buildClearFormsAction: function () {
        return _.extend({}, _blueprint, {
            type: actionConstants.CLEAR_CHORDS
        });
    },

    /**
     * @param {String[]} chords
     *
     * @returns {Object}
     */
    buildApplyChordPresetAction: function (chords) {
        return _.extend({}, _blueprint, {
            type: actionConstants.APPLY_CHORD_PRESET,
            chords: chords
        });
    },

    /**
     * @param {Number} newValue
     *
     * @returns {Object}
     */
    buildUpdateTranpositionAction: function (newValue) {
        return _.extend({}, _blueprint, {
            type: actionConstants.UPDATE_TRANSPOSITION,
            newValue: parseInt(newValue)
        });
    },

    /**
     * @param {Number} newValue
     *
     * @returns {Object}
     */
    buildUpdateCapoAction: function (newValue) {
        return _.extend({}, _blueprint, {
            type: actionConstants.UPDATE_CAPO,
            newValue: parseInt(newValue)
        });
    },

    /**
     * @param {String} newValue
     *
     * @returns {Object}
     */
    buildChangeDisplayTypeAction: function (newValue) {
        return _.extend({}, _blueprint, {
            type: actionConstants.CHANGE_DISPLAY_TYPE,
            newValue: newValue
        });
    }
};

module.exports = actionFactory;
