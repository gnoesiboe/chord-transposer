var React = require('react'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionFactory = require('./../utility/actionFactory'),
    actionConstants = require('./../constants/actionConstants');

module.exports = React.createClass({

    /**
     * @inheritDoc
     */
    getInitialState: function () {
        return this.getDefaultState();
    },

    /**
     * @return {Object}
     *
     * @private
     */
    getDefaultState: function () {
        return {
            name: null,
            error: null
        };
    },

    /**
     * @param {Object} event
     *
     * @private
     */
    onSubmit: function (event) {
        event.preventDefault();

        try {
            this.validateName();
        } catch (error) {
            this.setState({
                error: error.message
            });

            return;
        }

        appDispatcher.dispatch(
            actionFactory.buildAddChordAction(this.state.name)
        );

        this.clearForm();

        this.setState({
            error: null
        });
    },

    /**
     * @private
     *
     * @throws {Error}
     */
    validateName: function () {
        var match = this.state.name.match(/^[a-g]{1}[#b]{0,1}/i);

        if (match === null) {
            throw new Error('Invalid chord');
        }
    },

    clearForm: function () {
        this.setState(this.getDefaultState());
    },

    /**
     * @private
     */
    onNameChange: function () {
        this.setState({
            name: event.target.value
        });
    },

    /**
     * @returns {XML}
     */
    render: function () {
        var error = this.state.error ? <div className="help-block text-danger">{this.state.error}</div> : null;

        return (
            <div className="add-chord-component hidden-print">
                <form action="#" className="form" onSubmit={this.onSubmit}>
                    <input type="text"
                           placeholder="Add chord.."
                           className="form-control"
                           onChange={this.onNameChange}
                           value={this.state.name}/>
                    {error}
                </form>
            </div>
        );
    }
});
