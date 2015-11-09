var React = require('react'),
    ChordComponent = require('./chordComponent');

module.exports = React.createClass({

    /**
     * @return {XML}
     */
    render: function () {
        var listItems = [];

        for (var i = 0, l = this.props.chords.length; i < l; i++) {
            var chord = this.props.chords[i];

            listItems.push(
                <li className="list-group-item" key={'capo_' + chord.id}>
                    <ChordComponent chord={chord}
                                    transposition={this.props.transposition}
                                    capo={this.props.capo}
                                    displayType={this.props.displayType}/>
                </li>
            )
        }

        var results = <p className="text-muted">no input</p>;

        if (listItems.length > 0 ) {
            results = (
                <ul className="list-group">
                    {listItems}
                </ul>
            );
        }

        return (
            <div className="chords-with-capo-component  text-center">
                <h3>Playing..</h3>
                {results}
            </div>
        );
    }
});
