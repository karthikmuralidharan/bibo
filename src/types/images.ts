export interface ImageResponse {
    id: string;
    url: string;
    width: number;
    height: number;
}

export interface ImageList {
    images: ImageResponse[];
    breatheInMemory: string[];
    breatheOutMemory: string[];
}
