import React from 'react';
import ReactDOM from 'react-dom';
import { State } from '../state';

interface Props {
    state: State;
}

const Remember = ({ state }: Props) => {
    state.breatheIn.correctCount += 1;
    return (
        <div>
            <h1>SelectedCount : {state.breatheIn.correctCount}</h1>
        </div>
    );
};

export default Remember;
