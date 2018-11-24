import React from 'react';
import ReactDOM from 'react-dom';
import { State } from '../state';
import { string } from 'prop-types';
import { Image } from '../types/images';

interface Props {
    context: State;
}

export default class Remember extends React.Component<Props, any> {
    state: { err: Error | null; images: Image[] } = { err: null, images: [] };

    constructor(props: Props) {
        super(props);
    }

    componentWillMount = () => {
        fetch('localhost:8080/images.random')
            .then(res => {
                res.json().catch((resp: Image[]) => {
                    this.state.images = resp;
                });
            })
            .catch(e => {
                this.state.err = e;
            });
    };

    render() {
        return <div>test</div>;
    }
}
