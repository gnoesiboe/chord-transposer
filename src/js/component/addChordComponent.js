var React = require('react'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionFactory = require('./../utility/actionFactory'),
    actionConstants = require('./../constants/actionConstants'),
    presetStore = require('./../store/presetStore');

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
            error: null,
            presets: presetStore.getAll()
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

    /**
     * @private
     */
    clearForm: function () {
        this.setState(this.getDefaultState());
    },

    /**
     * @private
     */
    onNameChange: function () {
        this.setState({
            name: event.target.value,
            currentPresetId: 0
        });
    },

    /**
     * @private
     */
    onPresetChange: function () {
        var preset = this.state.presets.findOneById(event.target.value)

        if (preset === null) {
            return;
        }

        appDispatcher.dispatch(
            actionFactory.buildApplyChordPresetAction(preset.chords)
        );

        this.resetSelect();
    },

    /**
     * @private
     */
    resetSelect: function () {
        this.setState({
            currentPresetId: 0
        });
    },

    /**
     * @returns {XML}
     */
    render: function () {
        var error = this.state.error ? <div className="help-block text-danger">{this.state.error}</div> : null,
            presetOptions = [<option value="0" key={0}>presets</option>];

        this.state.presets.each(function (preset) {
            presetOptions.push(
                <option value={preset.id} key={preset.id}>
                    {preset.name}
                </option>
            );
        });

        return (
            <div className="add-chord-component hidden-print">
                <form action="#" className="form" onSubmit={this.onSubmit}>
                    <div className="form-group spacer-bottom-small">
                        <select className="form-control" value={this.state.currentPresetId} onChange={this.onPresetChange}>
                            {presetOptions}
                        </select>
                    </div>
                    <div className="form-group spacer-bottom-small">
                        <input type="text"
                               placeholder="Add chord.."
                               className="form-control"
                               onChange={this.onNameChange}
                               value={this.state.name}/>
                        {error}
                    </div>
                </form>
            </div>
        );
    }
});
