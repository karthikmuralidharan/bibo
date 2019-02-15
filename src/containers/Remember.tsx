import React from 'react';
import ReactDOM from 'react-dom';
import { Image, ImageListResponse } from '../types/images';
import GlobalProps from '../types/global';

// @ts-ignore
import Gallery from 'react-grid-gallery';
import { OperationType } from '../state';

interface GalleryDetail {
    src: string;
    thumbnail: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    isSelected: boolean;
}

export default class Remember extends React.Component<GlobalProps, any> {
    state: { err: Error | null; images: GalleryDetail[] } = {
        err: null,
        images: [],
    };

    constructor(props: GlobalProps) {
        super(props);
    }

    componentWillMount = () => {
        fetch('/images/random')
            .then(res => {
                res.json().then((resp: ImageListResponse) => {
                    const images = resp.images.map(img => {
                        return {
                            src: img.url,
                            thumbnail: img.url,
                            thumbnailWidth: img.width,
                            thumbnailHeight: img.height,
                            isSelected: false,
                        };
                    });
                    this.setState({ images: images });
                });
            })
            .catch(e => {
                this.state.err = e;
            });
    };

    private onSelect = (idx: number) => {
        const selected = !this.state.images[idx].isSelected;
        const img = this.state.images[idx];
        this.state.images[idx].isSelected = selected;
        this.setState(this.state);

        let count = 1;
        if (!selected) {
            count = -1;
        }

        switch (this.props.context.status) {
            case OperationType.BREATHE_IN_STARTED:
                this.props.context.breatheIn.selected;
                break;
            case OperationType.BREATHE_OUT_STARTED:
                this.props.context.breatheOut.selected;
                break;
        }
    };

    render() {
        return (
            <Gallery
                images={this.state.images}
                enableLightbox={false}
                onSelectImage={this.onSelect}
                margin={1}
            />
        );
    }
}
