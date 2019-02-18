import { GalleryImage, OperationType } from '../state';
import React, { useState, MouseEventHandler } from 'react';
import { curry } from 'lodash-es';

// @ts-ignore
import Gallery from 'react-grid-gallery';

interface Props {
    allImages: GalleryImage[];
    op: OperationType;
    memory: string[];
    onSubmit: (op: OperationType, selections: string[]) => MouseEventHandler;
}

const SelectionContainer = ({ allImages, onSubmit, memory, op }: Props) => {
    let [images, setImages] = useState<GalleryImage[]>(allImages);

    let selections = new Set<string>();

    const onSelection = (selections: Set<string>, idx: number) => {
        const image = images[idx];
        const selected = !image.isSelected;
        const maxSelectionExceeded = selections.size >= memory.length;

        if (selected && maxSelectionExceeded) {
            return;
        }

        if (selected) {
            selections.add(image.src);
        } else {
            selections.delete(image.src);
        }

        console.log('selection count: ', selections.size);

        image.isSelected = selected;
        setImages(images);
    };

    return (
        <div>
            <div>
                <p>Which of the following images do you remember seeing?</p>
                <br />
                <Gallery
                    images={images}
                    enableLightbox={false}
                    margin={10}
                    enableImageSelection={true}
                    onSelectImage={curry(onSelection)(selections)}
                />
            </div>
            <div>
                <button
                    onClick={e => onSubmit(op, Array.from(selections))(e)}
                    className="button is-large is-warning"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SelectionContainer;
