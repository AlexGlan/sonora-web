import { AudioTrack } from '../types/types';
import coreAudioPackage from './coreAudioPackage.json';

type AudioState = {
    tracks: {
        byId: Record<string, AudioTrack>,
        allIds: string[]
    },
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null,
}

const initialState: AudioState = {
    tracks: {
        byId: Object.fromEntries(
            coreAudioPackage.map(track => {
                return [
                    track.id,
                    {
                        id: track.id,
                        name: track.name,
                        category: track.category,
                        iconName: track.iconName,
                        authorName: track.authorName,
                        originalName: track.originalName,
                        originalAudioLink: track.originalAudioLink,
                        audioSrc: track.audioSrc,
                        volume: 0,
                        isPlaying: false,
                    }
                ]
            })
        ),
        allIds: coreAudioPackage.map(track => track.id),
    },
    status: 'idle',
    error: null,
}

export default initialState;