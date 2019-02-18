import React, { useState, useEffect } from 'react';
import StartButton from '../components/StartButton';
import { State, OperationType, GalleryImage } from '../state';
import Remember from '../components/Remember';
import '../styles/Base.css';
import { ImageListResponse } from '../types/images';

interface Props {
    context: State;
}

function Base(props: Props) {
    const [initialized, setInitialized] = useState(false);
    let [op, setOp] = useState(OperationType.NOT_STARTED);
    let [images, setImages] = useState<GalleryImage[]>([]);
    let [breatheInMemory, setBreatheInMemory] = useState<string[]>([]);
    let [breatheOutMemory, setBreatheOutMemory] = useState<string[]>([]);

    async function prepareImages(props: Props) {
        const res = await fetch('/images/random');
        const resp: ImageListResponse = await res.json();
        const galleryImages: GalleryImage[] = resp.images.map(img => {
            return {
                src: img.url,
                thumbnail: img.url,
                thumbnailWidth: img.width,
                thumbnailHeight: img.height,
                isSelected: false,
            };
        });

        setImages(galleryImages);
        setBreatheInMemory(resp.breatheInMemory);
        setBreatheOutMemory(resp.breatheOutMemory);
    }

    useEffect(() => {
        if (!initialized) {
            prepareImages(props).then(() => {
                setInitialized(true);
            });
        }
    });

    const onStart = () => {
        setOp(OperationType.BREATHE_IN_REMEMBER);
    };

    const startBreatheInSelection = () => {
        setOp(OperationType.BREATHE_IN_SELECTION);
    };

    const onSelection = (idx: number) => {
        const selected = !images[idx].isSelected;
        images[idx].isSelected = selected;

        setImages(images);

        let count = 1;
        if (!selected) {
            count = -1;
        }

        switch (op) {
            case OperationType.BREATHE_IN_SELECTION:
                props.context.breatheIn.selected;
                break;
            case OperationType.BREATHE_OUT_SELECTION:
                props.context.breatheOut.selected;
                break;
        }
    };

    const next = () => {
        switch (op) {
            case OperationType.NOT_STARTED:
                return <StartButton onClick={onStart} />;
            case OperationType.BREATHE_IN_REMEMBER:
                return (
                    <Remember
                        onClick={startBreatheInSelection}
                        images={images.filter(x =>
                            breatheInMemory.includes(x.src)
                        )}
                        op={op}
                    />
                );
        }
    };

    return <div className="Base">{next()}</div>;
}

export default Base;
