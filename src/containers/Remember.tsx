import React from 'react';
import ReactDOM from 'react-dom';
import { State } from '../state';
import { string } from 'prop-types';
import { Image, ImageListResponse } from '../types/images';
import GlobalProps from '../types/global';

export default class Remember extends React.Component<GlobalProps, any> {
    state: { err: Error | null; images: Image[] } = { err: null, images: [] };

    constructor(props: GlobalProps) {
        super(props);
    }

    componentWillMount = () => {
        fetch('http://localhost:8080/images.random')
            .then(res => {
                res.json().catch((resp: ImageListResponse) => {
                    this.state.images = resp.images;
                });
            })
            .catch(e => {
                this.state.err = e;
            });
    };

    render() {
        return <div>hello</div>;
    }
}
