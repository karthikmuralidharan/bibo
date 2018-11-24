import { string } from 'prop-types';

export interface SelectionDetail {
    selection: string[];
    correctCount: number;
    selected: string[];
}

export interface State {
    breatheIn: SelectionDetail;
    breatheOut: SelectionDetail;
    selectionCount: number;
    status: OperationType;
}

export enum OperationType {
    NOT_STARTED,
    STARTED,
    BREATHE_IN_STARTED,
    BREATHE_IN_COMPLETE,
    BREATHE_OUT_STARTED,
    BREATHE_OUT_COMPLETE,
    SUBMISSION,
}

export function NewState(): State {
    return {
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
        selectionCount: 3,
        status: OperationType.NOT_STARTED,
    };
}
