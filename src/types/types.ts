export type ResponseData = {
    _id: string,
    name: string,
    category?: string,
    iconName?: string,
    authorName: string,
    originalName: string,
    originalAudioLink: string,
    audioSrc: string
}[]

export type AudioResponse = { data: ResponseData, error: null } | { data: null, error: string }

export type AudioTrack = {
    id: string,
    name: string,
    category?: string,
    iconName?: string,
    authorName: string,
    originalName: string,
    originalAudioLink: string,
    audioSrc: string
    volume: number,
    isPlaying: boolean,
}
