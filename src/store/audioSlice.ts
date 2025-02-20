import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from './audioData.json';

type AudioTrack = {
    id: number,
    name: string,
    category: string,
    audioSrc: string,
    iconName: string,
    volume: number,
    isPlaying: boolean,
}

type AudioState = {
    tracks: {
        byId: Record<number, AudioTrack>,
        allIds: number[]
    },
}

const initialState: AudioState = {
    tracks: {
        byId: {},
        allIds: []
    },
}
data.forEach(track => {
    initialState.tracks.byId[track.id] = {
        id: track.id,
        name: track.name,
        category: track.category,
        audioSrc: track.audioSrc,
        iconName: track.iconName,
        volume: track.name === 'Rain' || track.name === 'Crickets' ? 30 : 0,
        isPlaying: false,
    };
    initialState.tracks.allIds.push(track.id);
});

export const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setVolume: (state, action: PayloadAction<{trackId: number, volume: number}>) => {
            const { trackId, volume } = action.payload;
            if (state.tracks.byId[trackId]) {
                state.tracks.byId[trackId].volume = volume;
            }
        },
        setPlayStatus: (state, action: PayloadAction<{trackId: number, isPlaying: boolean}>) => {
            const { trackId, isPlaying } = action.payload;
            if (state.tracks.byId[trackId]) {
                state.tracks.byId[trackId].isPlaying = isPlaying;
            }
        },
        setGlobalVolume: (state, action: PayloadAction<string>) => {
            state.tracks.allIds.forEach(trackId => {
                if (state.tracks.byId[trackId].volume > 0 ||
                    state.tracks.byId[trackId].isPlaying
                ) {
                    state.tracks.byId[trackId].volume = parseInt(action.payload);
                }
            });
        },
        setGlobalPlayStatus: (state, action: PayloadAction<boolean>) => {
            state.tracks.allIds.forEach(trackId => {
                if (state.tracks.byId[trackId].volume > 0) {
                    if (action.payload === true) {
                        state.tracks.byId[trackId].isPlaying = true;
                    } else {
                        state.tracks.byId[trackId].isPlaying = false;
                    }
                }
            });
        },
        resetTracks: () => {
            return initialState;
        },
    }
});

export default audioSlice.reducer;
export const { 
    setVolume,
    setPlayStatus,
    setGlobalVolume,
    setGlobalPlayStatus,
    resetTracks,
} = audioSlice.actions;
