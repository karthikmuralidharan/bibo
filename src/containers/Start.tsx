import React, { Component, MouseEventHandler } from 'react';
import StartButton from '../components/StartButton';
import '../styles/Start.css';
import { State, OperationType } from '../state';
import Remember from './Remember';
import ReactDOM, { render } from 'react-dom';

interface Props {
    state: State;
}

const Start = ({ state }: Props) => {
    console.log(state);

    switch (state.status) {
        case OperationType.NOT_STARTED:
            const handler = (e: any) => {
                e.preventDefault();
                state.status = OperationType.STARTED;
                console.log('button tapped');
            };
            return (
                <div className="Start">
                    <StartButton onClick={handler} />
                </div>
            );
        default:
            return <Remember state={state} />;
    }
};

export default Start;
