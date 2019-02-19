import React, { MouseEventHandler } from 'react';

interface Props {
    onClick: MouseEventHandler;
}

const StartButton = ({ onClick }: Props) => {
    return (
        <button
            onClick={e => onClick(e)}
            className="button is-large is-warning"
        >
            Start
        </button>
    );
};

export default StartButton;
