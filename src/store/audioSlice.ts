import { createSlice } from "@reduxjs/toolkit";
import data from './audioData.json';

type AudioTrack = {
    id: number,
    name: string,
    category: string,
    fileName: string,
    volume: number,
    isPlaying: boolean,
}

type AudioState = {
    tracks: Record<number, AudioTrack>,
}

const initialState: AudioState = {
    tracks: {},
}
data.forEach(track => {
    initialState.tracks[track.id] = {
        id: track.id,
        name: track.name,
        category: track.category,
        fileName: track.fileName,
        volume: track.name === 'Rain' || track.name === 'Crickets' ? 0.3 : 0,
        isPlaying: false,
    };
});

export const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setVolume: (state, action) => {
            return {
                tracks: {
                    ...state.tracks,
                    [action.payload.trackId]: {
                        ...state.tracks[action.payload.trackId],
                        volume: action.payload.volume
                    }
                }
            }
        },
        setPlayStatus: (state, action) => {
            return {
                tracks: {
                    ...state.tracks,
                    [action.payload.trackId]: {
                        ...state.tracks[action.payload.trackId],
                        isPlaying: action.payload.isPlaying
                    }
                }
            }
        },
    }
});

export default audioSlice.reducer;
export const {setVolume, setPlayStatus} = audioSlice.actions;
