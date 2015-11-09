var Preset = require('./../model/preset'),
    idGenerator = require('./../utility/idGenerator'),
    PresetCollection = require('./../collection/presetCollection');

/**
 * @type {PresetCollection}
 *
 * @private
 */
var _presets = new PresetCollection([
    new Preset(idGenerator.generate(), 'A / F#m', ['A', 'B', 'C#m', 'D', 'E', 'F#min', 'G#dim']),
    new Preset(idGenerator.generate(), 'Bb / Gm', ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'])
]);

module.exports = {

    /**
     * @returns {PresetCollection}
     */
    getAll: function () {
        return _presets;
    }
};
