var React = require('react'),
    appDispatcher = require('./../utility/appDispatcher'),
    actionFactory = require('./../utility/actionFactory'),
    contextStore = require('./../store/contextStore'),
    displayTypeConstants = require('./../constants/displayTypeConstants');

module.exports = React.createClass({

    /**
     * @inheritDoc
     */
    componentDidMount: function () {
        contextStore.registerOnChangeListener(this.onContextChanged);
    },

    /**
     * @returns {Object}
     */
    getInitialState() {
        return this.getDefaultState();
    },

    /**
     * @private
     */
    onContextChanged: function () {
        this.setState(this.getDefaultState());
    },

    /**
     * @returns {Object}
     */
    getDefaultState() {
        return {
            transposition: contextStore.getCurrentTransposition(),
            capo: contextStore.getCapo(),
            displayType: contextStore.getCurrentDisplayType()
        };
    },

    /**
     * @param {Object} event
     *
     * @private
     */
    onTranspositionChanged: function (event) {
        var newValue = parseInt(event.target.value);

        if (newValue > 11 || newValue < -11) {
            return;
        }

        appDispatcher.dispatch(
            actionFactory.buildUpdateTranpositionAction(newValue)
        );
    },

    /**
     * @param {Object} event
     *
     * @private
     */
    onCapoCange: function (event) {
        var newValue = parseInt(event.target.value);

        if (newValue < 0) {
            return;
        }

        appDispatcher.dispatch(
            actionFactory.buildUpdateCapoAction(newValue)
        );
    },

    /**
     * @param {Object} event
     *
     * @private
     */
    onDisplayTypeChange: function (event) {
        var newValue = event.target.value;

        if (newValue === this.state.displayType) {
            return;
        }

        appDispatcher.dispatch(
            actionFactory.buildChangeDisplayTypeAction(newValue)
        );
    },

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="transpose-form-component">
                <form className="form">
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-4">
                            <div className="input-group">
                                <input type="number"
                                       id="transposition-field"
                                       onChange={this.onTranspositionChanged}
                                       value={this.state.transposition}
                                       className="form-control" />
                                <div className="input-group-addon">Transposition</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-4">
                            <div className="input-group">
                                <input type="number"
                                       id="capo-field"
                                       onChange={this.onCapoCange}
                                       value={this.state.capo}
                                       className="form-control" />
                                <div className="input-group-addon">Capo</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 checkbox">
                            <label>
                                <input type="radio"
                                       name="display-type"
                                       onChange={this.onDisplayTypeChange}
                                       value={displayTypeConstants.SHARP}
                                       checked={this.state.displayType === displayTypeConstants.SHARP} /> #
                            </label>
                            <label>
                                <input type="radio"
                                       name="display-type"
                                       onChange={this.onDisplayTypeChange}
                                       value={displayTypeConstants.FLAT}
                                       checked={this.state.displayType === displayTypeConstants.FLAT}/> b
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});
