var Preset = require('./../model/preset'),
    idGenerator = require('./../utility/idGenerator'),
    PresetCollection = require('./../collection/presetCollection');

/**
 * @type {PresetCollection}
 *
 * @private
 */
var _presets = new PresetCollection([
    new Preset(idGenerator.generate(), 'A / F#m', ['A', 'B', 'C#m', 'D', 'E', 'F#m', 'G#dim']),
    new Preset(idGenerator.generate(), 'Bb / Gm', ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim']),
    new Preset(idGenerator.generate(), 'C / Am', ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim']),
    new Preset(idGenerator.generate(), 'Db / Abm', ['Db', 'Ebm', 'Fm', 'Gb', 'Bbm', 'Cdim']),
    new Preset(idGenerator.generate(), 'D / Bm', ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dfim']),
    new Preset(idGenerator.generate(), 'Eb / Cm', ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim']),
    new Preset(idGenerator.generate(), 'E / C#m', ['E', 'F#m', 'G#m', 'A', 'Bm', 'C#m', 'D#dim']),
    new Preset(idGenerator.generate(), 'F / Dm', ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim']),
    new Preset(idGenerator.generate(), 'F# / D#m', ['F#', 'G#m', 'A#m', 'F', 'C#', 'D#m', 'E#dim']),
    new Preset(idGenerator.generate(), 'G / Em', ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim']),
    new Preset(idGenerator.generate(), 'Ab / Fm', ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Gdim']),
    new Preset(idGenerator.generate(), 'A / F#m', ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim']),
    new Preset(idGenerator.generate(), 'Bb / Gm', ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim']),
    new Preset(idGenerator.generate(), 'B / G#m', ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'])
]);

module.exports = {

    /**
     * @returns {PresetCollection}
     */
    getAll: function () {
        return _presets;
    }
};
