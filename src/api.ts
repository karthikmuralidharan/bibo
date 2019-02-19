import { ImageListResponse } from './types/images';
import { GalleryImage } from './state';

async function postData(url = ``, data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })

    const resp = await response.json()
    return resp
}

export async function prepareImages() {
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

export async function submitReport(report: { inCount: number, outCount: number, selectionSize: number }) {
    return await postData('/report/submit', report)
}
