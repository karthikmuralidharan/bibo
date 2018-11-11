import React, { Component, MouseEventHandler } from 'react';
import StartButton from '../components/StartButton';
import '../styles/Base.css';
import { State, OperationType } from '../state';
import Remember from './Remember';
import ReactDOM, { render } from 'react-dom';

interface Props {
    context: State;
}

class Base extends React.Component<Props, any> {
    state = {
        operationState: OperationType.NOT_STARTED,
    };

    constructor(props: Props) {
        super(props);
    }

    handleStart = () => {
        this.setState({ operationState: OperationType.STARTED });
    };

    next = () => {
        switch (this.state.operationState) {
            case OperationType.NOT_STARTED:
                console.log('reached');
                return <StartButton onClick={this.handleStart} />;
            case OperationType.STARTED:
                return <Remember state={this.props.context} />;
        }
    };

    render() {
        const container = this.next();
        return <div className="Base">{container}</div>;
    }
}

export default Base;
