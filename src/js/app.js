var React = require('react'), // required for ReactDOM
    ReactDOM = require('react-dom'),
    AppComponent = require('./component/appComponent');

ReactDOM.render(
    <AppComponent />,
    document.getElementById('js-app-container')
);
