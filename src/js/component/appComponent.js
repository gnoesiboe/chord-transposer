var React = require('react'),
    ChordOverviewComponent = require('./chordOverviewComponent'),
    chordStore = require('./../store/chordStore'),
    contextStore = require('./../store/contextStore'),
    ChordResultsComponent = require('./chordResultsComponent'),
    TransposeFormComponent = require('./transposeFormComponent'),
    AddChordComponent = require('./addChordComponent');

module.exports = React.createClass({

    /**
     * @inheritDoc
     */
    componentDidMount: function () {
        contextStore.registerOnChangeListener(this.onContextChanged);
        chordStore.registerChangeListener(this.onChordsChanged);
    },

    /**
     * @private
     */
    onChordsChanged: function () {
        this.setState({
            chords: chordStore.getAll()
        });
    },

    /**
     * @private
     */
    onContextChanged: function () {
        this.setState({
            transposition: contextStore.getCurrentTransposition(),
            capo: contextStore.getCapo(),
            displayType: contextStore.getCurrentDisplayType()
        });
    },

    /**
     * @inheritDoc
     */
    getInitialState: function () {
        return this.getDefaultState();
    },

    /**
     * @inheritDoc
     *
     * @returns {Object}
     */
    getDefaultState: function () {
        return {
            chords: chordStore.getAll(),
            transposition: contextStore.getCurrentTransposition(),
            capo: contextStore.getCapo(),
            displayType: contextStore.getCurrentDisplayType()
        };
    },

    /**
     * @returns {XML}
     */
    render: function () {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <TransposeFormComponent />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6 col-sm-4 col-sm-offset-2">
                        <ChordOverviewComponent chords={this.state.chords}/>
                        <AddChordComponent />
                    </div>
                    <div className="col-xs-6 col-sm-4">
                        <ChordResultsComponent chords={this.state.chords}
                                               transposition={this.state.transposition}
                                               capo={this.state.capo}
                                               displayType={this.state.displayType}/>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
});
