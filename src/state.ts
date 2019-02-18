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
