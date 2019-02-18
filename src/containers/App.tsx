import React, { Component } from 'react';
import '../styles/App.css';
import Header from '../components/Header';
import Base from './Base';
import { State } from '../state';

interface IProps {
    context: State;
}

const App = ({ context }: IProps) => {
    return (
        <div className="App">
            <Header />
            <div id="rootContainer">
                <Base />
            </div>
        </div>
    );
};

export default App;
