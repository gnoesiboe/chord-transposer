/**
 * @param {String} id
 * @param {String} name
 * @param {Array} chords
 *
 * @constructor
 */
var Preset = function (id, name, chords) {
    this.id = id;
    this.name = name;
    this.chords = chords;
};

module.exports = Preset;
