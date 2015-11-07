var React = require('react'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionFactory = require('./../utility/actionFactory'),
    actionConstants = require('./../constants/actionConstants');

module.exports = React.createClass({

    /**
     * @param {Object} event
     *
     * @private
     */
    onCloseClick: function (event) {
        event.preventDefault();

        var confirmed = confirm('Are you sure?');

        if (confirmed) {
            appDispatcher.dispatch(
                actionFactory.buildRemoveChordAction(this.props.chord.id)
            );
        }
    },

    /**
     * @returns {XML}
     */
    render: function () {
        var chord = this.props.chord;

        var title = chord.name;

        if (typeof this.props.transposition !== 'undefined') {
            title = chord.transpose(this.props.transposition, this.props.displayType, this.props.capo || 0);
        }

        var close = this.props.displayClose
            ? <a href="#" className="pull-right" onClick={this.onCloseClick}>x</a>
            : null;

        return (
            <div className="chord-component">
                {close}
                {title} <sup>{chord.addition}</sup>
            </div>
        );
    }
});
