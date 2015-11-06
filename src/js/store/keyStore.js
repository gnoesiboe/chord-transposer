var Key = require('./../model/key'),
    KeyCollection = require('./../collection/keyCollection');

var _keys = new KeyCollection([
    new Key('A', 'A'),
    new Key('A#', 'Bb'),
    new Key('B', 'B'),
    new Key('C', 'C'),
    new Key('C#', 'Db'),
    new Key('D', 'D'),
    new Key('D#', 'Eb'),
    new Key('E', 'E'),
    new Key('F', 'F'),
    new Key('F#', 'Gb'),
    new Key('G', 'G'),
    new Key('G#', 'Ab')
]);

module.exports = {

    /**
     * @returns {KeyCollection}
     */
    getAll: function () {
        return _keys;
    }
};
