import React, { Component } from 'react';
import '../styles/App.css';
import Header from '../components/Header';
import Base from './Base';
import { NewState, State } from '../state';

interface Props {
    state: State;
}

const App = ({ state }: Props) => {
    return (
        <div className="App">
            <Header />
            <div id="rootContainer">
                <Base state={state} />
            </div>
        </div>
    );
};

export default App;
