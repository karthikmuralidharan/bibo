import React, { Component } from 'react';
import '../styles/App.css';
import Header from '../components/Header';
import Start from './Start';
import { NewState, State } from '../state';

interface Props {
    state: State;
}

const App = ({ state }: Props) => {
    return (
        <div className="App">
            <Header />
            <div id="rootContainer">
                <Start state={state} />
            </div>
        </div>
    );
};

export default App;
