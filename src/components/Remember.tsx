import React, { Component, MouseEventHandler } from 'react';

// @ts-ignore
import Gallery from 'react-grid-gallery';
import { OperationType, GalleryImage } from '../state';

interface Props {
    onClick: MouseEventHandler;
    op: OperationType;
    images: GalleryImage[];
}

const opMessage = (op: OperationType) => {
    switch (op) {
        case OperationType.BREATHE_IN_REMEMBER:
            return 'Breathe In';
        default:
            return 'Breathe Out';
    }
};

const Remember = ({ onClick, op, images }: Props) => {
    return (
        <div>
            <p>Take a deep breath.</p>
            <p>Exhale.</p>
            <p>Repeat.</p>
            <p>Now as you {opMessage(op)}, take a look at these images</p>
            <br />
            <Gallery
                images={images}
                enableLightbox={false}
                margin={1}
                enableImageSelection={false}
            />
            <br />
            <button
                onClick={e => onClick(e)}
                className="button is-large is-warning"
            >
                Next
            </button>
        </div>
    );
};

export default Remember;
