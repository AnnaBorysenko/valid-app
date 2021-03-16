import React, { Component } from 'react';
import Form from './components/Form/Form.js';


class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Bank <strong> Support Portal</strong></h1>
                <Form />
            </div>
        );
    }
}

export default App;