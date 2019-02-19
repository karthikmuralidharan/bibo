import React, { MouseEventHandler, useEffect, useState } from 'react';
import Remember from '../components/Remember';
import StartButton from '../components/StartButton';
import { GalleryImage, OperationType, nextOp, generateReport } from '../state';
import { prepareImages } from '../api';
import Selection from './Selection';
import Report from '../components/Report';

import '../styles/Base.css';

function Base() {
    const [initialized, setInitialized] = useState(false);
    let [op, setOp] = useState(OperationType.NOT_STARTED);
    let [images, setImages] = useState<GalleryImage[]>([]);

    let [breatheInMemory, setBreatheInMemory] = useState<string[]>([]);
    let [breatheInCount, setBreatheInCount] = useState(0);

    let [breatheOutMemory, setBreatheOutMemory] = useState<string[]>([]);
    let [breatheOutCount, setBreatheOutCount] = useState(0);

    const [selectionSize, setSelectionSize] = useState(0);

    useEffect(() => {
        if (initialized) return;
        prepareImages().then(({ gallery, inMemory, outMemory }) => {
            setInitialized(true);
            setImages(gallery);
            setBreatheInMemory(inMemory);
            setBreatheOutMemory(outMemory);
            setSelectionSize(inMemory.length);
        });
    });

    const goToNextState = () => {
        setOp(nextOp(op));
    };

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

    const setCounterFor = (op: OperationType, count: number) => {
        return op == OperationType.BREATHE_IN_SELECTION
            ? setBreatheInCount(count)
            : setBreatheOutCount(count);
    };

    const updateBreatheCount = (op: OperationType, selection: string[]) => {
        let intersection = memoryFor(op).filter(x => selection.includes(x));
        console.log(
            'received op: ',
            op,
            'with selection: ',
            selection,
            ' and intersection: ',
            intersection
        );
        setCounterFor(op, intersection.length);
    };

    const resetImageSelections = () => {
        setImages(
            images.map(img => {
                img.isSelected = false;
                return img;
            })
        );
    };

    const onSubmit = (
        op: OperationType,
        selection: string[]
    ): MouseEventHandler => {
        return () => {
            resetImageSelections();
            updateBreatheCount(op, selection);
            goToNextState();
        };
    };

    const next = () => {
        switch (op) {
            case OperationType.NOT_STARTED:
                return <StartButton onClick={goToNextState} />;
            case OperationType.BREATHE_IN_REMEMBER:
            case OperationType.BREATHE_OUT_REMEMBER:
                return (
                    <Remember
                        onClick={goToNextState}
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
            case OperationType.SUBMISSION:
                const { inPercentage, outPercentage } = generateReport(
                    breatheInCount,
                    breatheOutCount,
                    selectionSize
                );
                return (
                    <Report
                        inPercent={inPercentage}
                        outPercent={outPercentage}
                    />
                );
        }
    };

    return <div className="Base">{next()}</div>;
}

export default Base;
