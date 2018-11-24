export interface FixedHeightStill {
    url: string;
    width: string;
    height: string;
}

export interface OriginalStill {
    url: string;
    width: string;
    height: string;
}

export interface FixedWidth {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
}

export interface FixedHeightSmallStill {
    url: string;
    width: string;
    height: string;
}

export interface FixedHeightDownsampled {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
}

export interface Preview {
    width: string;
    height: string;
    mp4: string;
    mp4_size: string;
}

export interface FixedHeightSmall {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
}

export interface DownsizedStill {
    url: string;
    width: string;
    height: string;
}

export interface Downsized {
    url: string;
    width: string;
    height: string;
    size: string;
}

export interface DownsizedLarge {
    url: string;
    width: string;
    height: string;
    size: string;
}

export interface FixedWidthSmallStill {
    url: string;
    width: string;
    height: string;
}

export interface PreviewWebp {
    url: string;
    width: string;
    height: string;
    size: string;
}

export interface FixedWidthStill {
    url: string;
    width: string;
    height: string;
}

export interface FixedWidthSmall {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
}

export interface DownsizedSmall {
    width: string;
    height: string;
    mp4: string;
    mp4_size: string;
}

export interface FixedWidthDownsampled {
    url: string;
    width: string;
    height: string;
    size: string;
    webp: string;
    webp_size: string;
}

export interface DownsizedMedium {
    url: string;
    width: string;
    height: string;
    size: string;
}

export interface Original {
    url: string;
    width: string;
    height: string;
    size: string;
    frames: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
}

export interface FixedHeight {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
}

export interface Looping {
    mp4: string;
    mp4_size: string;
}

export interface OriginalMp4 {
    width: string;
    height: string;
    mp4: string;
    mp4_size: string;
}

export interface PreviewGif {
    url: string;
    width: string;
    height: string;
    size: string;
}

export interface Still480p {
    url: string;
    width: string;
    height: string;
}

export interface Images {
    fixed_height_still: FixedHeightStill;
    original_still: OriginalStill;
    fixed_width: FixedWidth;
    fixed_height_small_still: FixedHeightSmallStill;
    fixed_height_downsampled: FixedHeightDownsampled;
    preview: Preview;
    fixed_height_small: FixedHeightSmall;
    downsized_still: DownsizedStill;
    downsized: Downsized;
    downsized_large: DownsizedLarge;
    fixed_width_small_still: FixedWidthSmallStill;
    preview_webp: PreviewWebp;
    fixed_width_still: FixedWidthStill;
    fixed_width_small: FixedWidthSmall;
    downsized_small: DownsizedSmall;
    fixed_width_downsampled: FixedWidthDownsampled;
    downsized_medium: DownsizedMedium;
    original: Original;
    fixed_height: FixedHeight;
    looping: Looping;
    original_mp4: OriginalMp4;
    preview_gif: PreviewGif;
    '480w_still': Still480p;
}

export interface Response {
    type: string;
    id: string;
    slug: string;
    url: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    import_datetime: string;
    trending_datetime: string;
    images: Images;
    title: string;
    image_original_url: string;
    image_url: string;
    image_mp4_url: string;
    image_frames: string;
    image_width: string;
    image_height: string;
    fixed_height_downsampled_url: string;
    fixed_height_downsampled_width: string;
    fixed_height_downsampled_height: string;
    fixed_width_downsampled_url: string;
    fixed_width_downsampled_width: string;
    fixed_width_downsampled_height: string;
    fixed_height_small_url: string;
    fixed_height_small_still_url: string;
    fixed_height_small_width: string;
    fixed_height_small_height: string;
    fixed_width_small_url: string;
    fixed_width_small_still_url: string;
    fixed_width_small_width: string;
    fixed_width_small_height: string;
    caption: string;
}

export interface Image {
    id: string;
    response: Response;
}
