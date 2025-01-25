export const validateYoutubeLink = (url: string): boolean => {
    const protocol = "https?:\\/\\/"; // Matches http:// or https://
    const www = "(www\\.)?"; // Matches optional www.
    const videoPath = "youtube\\.com\\/(watch\\?v=[a-zA-Z0-9]{11}|live\\/[a-zA-Z0-9]{11})";
    const shortUrl = "youtu\\.be\\/[a-zA-Z0-9]{11}"; // Matches shortened YouTube URLs
    const queryParams = "(\\?[^ ]*)?"; // Matches optional query parameters

    const pattern = new RegExp(`^(${protocol})(${www})(${videoPath}|${shortUrl})${queryParams}$`);
    return url != null && pattern.test(url);
}

export const extractVideoId = (url: string): string | null => {
    if (!url) {
        return null;
    } else {
        const splitUrl: string[] = url.split(/[^a-z0-9]/i);
        const videoId = splitUrl.find(fragment => fragment.length === 11);
        return videoId ?? null;
    }
}
