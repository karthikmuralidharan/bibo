export interface GalleryImage {
    src: string;
    thumbnail: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    isSelected: boolean;
}

export interface SelectionDetail {
    selection: string[];
    correctCount: number;
    selected: string[];
}

export interface State {
    images: GalleryImage[];
    breatheIn: SelectionDetail;
    breatheOut: SelectionDetail;
    selectionCount: number;
    status: OperationType;
}

export enum OperationType {
    NOT_STARTED,
    BREATHE_IN_REMEMBER,
    BREATHE_IN_SELECTION,
    BREATHE_OUT_REMEMBER,
    BREATHE_OUT_SELECTION,
    SUBMISSION,
}

export function NewState(): State {
    return {
        images: [],
        breatheIn: {
            selected: [],
            selection: [],
            correctCount: 0,
        },
        breatheOut: {
            selected: [],
            selection: [],
            correctCount: 0,
        },
        selectionCount: 5,
        status: OperationType.NOT_STARTED,
    };
}

export function nextOp(op: OperationType): OperationType {
    switch (op) {
        case OperationType.NOT_STARTED:
            return OperationType.BREATHE_IN_REMEMBER;
        case OperationType.BREATHE_IN_REMEMBER:
            return OperationType.BREATHE_IN_SELECTION;
        case OperationType.BREATHE_IN_SELECTION:
            return OperationType.BREATHE_OUT_REMEMBER;
        case OperationType.BREATHE_OUT_REMEMBER:
            return OperationType.BREATHE_OUT_SELECTION;
        case OperationType.BREATHE_OUT_SELECTION:
            return OperationType.SUBMISSION;
    }
    return OperationType.NOT_STARTED;
}

export function generateReport(
    inCount: number,
    outCount: number,
    selectionSize: number
) {
    const inPercentage = Math.floor(inCount / selectionSize * 100);
    const outPercentage = Math.floor(outCount / selectionSize * 100);
    return {
        inPercentage,
        outPercentage,
    };
}
