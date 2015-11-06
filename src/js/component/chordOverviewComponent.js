var React = require('react'),
    ChordComponent = require('./chordComponent'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionFactory = require('./../utility/actionFactory'),
    actionConstants = require('./../constants/actionConstants');

module.exports = React.createClass({

    /**
     * @param {Object} event
     *
     * @private
     */
    onClearClick: function (event) {
        event.preventDefault();

        if (confirm('Are you sure?!')) {
            appDispatcher.dispatch(
                actionFactory.buildClearFormsAction()
            );
        }
    },

    /**
     * @returns {XML}
     */
    render() {
        var listItems = [];

        for (var i = 0, l = this.props.chords.length; i < l; i++) {
            var chord = this.props.chords[i];

            listItems.push(
                <li className="list-group-item" key={chord.id}>
                    <ChordComponent chord={chord} displayClose={true}/>
                </li>
            )
        }

        var results = <p className="text-muted">no input</p>;

        if (listItems.length > 0) {
            results = (
                <ul className="list-group">
                    {listItems}
                </ul>
            );
        }

        return (
            <div className="chord-overview-component text-center">
                <h3>Input</h3>
                {results}
                <p className="clearfix hidden-print">
                    <a href="#" className="pull-right" onClick={this.onClearClick}>clear</a>
                </p>
            </div>
        );
    }
});
