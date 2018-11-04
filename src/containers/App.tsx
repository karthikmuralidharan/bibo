import React, { Component } from 'react';
import '../styles/App.css';
import Header from '../components/Header';
import Start from './Start';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Start />
            </div>
        );
    }
}

export default App;
