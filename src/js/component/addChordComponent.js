var React = require('react'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionFactory = require('./../utility/actionFactory'),
    actionConstants = require('./../constants/actionConstants'),
    presetStore = require('./../store/presetStore'),
    SelectComponent = require('react-select');

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
     * @param {Object} event
     *
     * @private
     */
    onNameChange: function (event) {
        this.setState({
            name: event.target.value
        });
    },

    /**
     * @param {String} presetId
     *
     * @private
     */
    onPresetChange: function (presetId) {
        var preset = this.state.presets.findOneById(presetId);

        if (preset === null) {
            return;
        }

        appDispatcher.dispatch(
            actionFactory.buildApplyChordPresetAction(preset.chords)
        );
    },

    /**
     * @param {Object} option
     *
     * @returns {XML}
     */
    renderPresetSelectOption: function (option) {
        var preset = this.state.presets.findOneById(option.value);

        var chordsInPreset = preset.chords.join(', ');

        return (
            <div>
                <strong>{option.label}</strong><br />
                <p className="text-muted">{chordsInPreset}</p>
            </div>
        );
    },

    /**
     * @returns {XML}
     */
    render: function () {
        var error = this.state.error ? <div className="help-block text-danger">{this.state.error}</div> : null;

        var presetOptions = [];
        this.state.presets.each(function (preset) {
            presetOptions.push({
                value: preset.id,
                label: preset.name
            });
        });

        return (
            <div className="add-chord-component hidden-print">
                <div className="form-group spacer-bottom-small">
                    <SelectComponent options={presetOptions}
                                     onChange={this.onPresetChange}
                                     optionRenderer={this.renderPresetSelectOption}/>
                </div>
                <form action="#" className="form" onSubmit={this.onSubmit}>
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
