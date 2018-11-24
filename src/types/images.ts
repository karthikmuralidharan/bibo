export interface Image {
    id: string;
    url: string;
    width: number;
    height: number;
}

export interface ImageListResponse {
    images: Image[];
}
