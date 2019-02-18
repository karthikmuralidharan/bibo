import React, { useState, useEffect, MouseEventHandler } from 'react';
import StartButton from '../components/StartButton';
import { State, OperationType, GalleryImage } from '../state';
import Remember from '../components/Remember';
import '../styles/Base.css';
import { ImageListResponse } from '../types/images';
import Selection from './Selection';

interface Props {
    context: State;
}

async function prepareImages() {
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

    return {
        gallery: galleryImages,
        inMemory: resp.breatheInMemory,
        outMemory: resp.breatheOutMemory,
    };
}

function Base() {
    const [initialized, setInitialized] = useState(false);
    let [op, setOp] = useState(OperationType.NOT_STARTED);
    let [images, setImages] = useState<GalleryImage[]>([]);

    let [breatheInMemory, setBreatheInMemory] = useState<string[]>([]);
    let [breatheInCount, setBreatheInCount] = useState(0);

    let [breatheOutMemory, setBreatheOutMemory] = useState<string[]>([]);
    let [breatheOutCount, setBreatheOutCount] = useState(0);

    const memoryFor = (op: OperationType) => {
        switch (op) {
            case OperationType.BREATHE_IN_SELECTION:
            case OperationType.BREATHE_IN_REMEMBER:
                return breatheInMemory;
            case OperationType.BREATHE_OUT_SELECTION:
            case OperationType.BREATHE_OUT_REMEMBER:
                return breatheOutMemory;
        }
        return [];
    };

    useEffect(() => {
        if (initialized) return;
        prepareImages().then(({ gallery, inMemory, outMemory }) => {
            setInitialized(true);
            setImages(gallery);
            setBreatheInMemory(inMemory);
            setBreatheOutMemory(outMemory);
        });
    });

    const onStart = () => {
        setOp(OperationType.BREATHE_IN_REMEMBER);
    };

    const startBreatheInSelection = () => {
        setOp(OperationType.BREATHE_IN_SELECTION);
    };

    const onSubmit = (
        op: OperationType,
        selection: string[]
    ): MouseEventHandler => {
        return e => {
            console.log('received op: ', op, 'with selection: ', selection);
        };
    };

    const next = () => {
        switch (op) {
            case OperationType.NOT_STARTED:
                return <StartButton onClick={onStart} />;
            case OperationType.BREATHE_IN_REMEMBER:
            case OperationType.BREATHE_OUT_REMEMBER:
                return (
                    <Remember
                        onClick={startBreatheInSelection}
                        images={images.filter(x =>
                            memoryFor(op).includes(x.src)
                        )}
                        op={op}
                    />
                );
            case OperationType.BREATHE_IN_SELECTION:
            case OperationType.BREATHE_OUT_SELECTION:
                return (
                    <Selection
                        allImages={images}
                        onSubmit={onSubmit}
                        op={op}
                        memory={memoryFor(op)}
                    />
                );
        }
    };

    return <div className="Base">{next()}</div>;
}

export default Base;
