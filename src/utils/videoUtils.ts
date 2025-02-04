export const validateYoutubeLink = (url: string): boolean => {
    const protocol = "https?:\\/\\/"; // Matches http:// or https://
    const www = "(www\\.)?"; // Matches optional www.
    const videoPath = "youtube\\.com\\/(watch\\?v=[a-zA-Z0-9_]{11}|live\\/[a-zA-Z0-9_]{11})";
    const shortUrl = "youtu\\.be\\/[a-zA-Z0-9_]{11}"; // Matches shortened YouTube URLs
    const queryParams = "([?&][a-zA-Z0-9]+.*)?"; // Matches optional query parameters

    const pattern = new RegExp(`^(${protocol})(${www})(${videoPath}|${shortUrl})${queryParams}$`);
    return url != null && pattern.test(url);
}

export const extractVideoId = (url: string): string | null => {
    if (!url) {
        return null;
    } else {
        const splitUrl: string[] = url.split(/[^a-z0-9_]/i);
        const videoId = splitUrl.find(fragment => fragment.length === 11);
        return videoId ?? null;
    }
}
