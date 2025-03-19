import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import coreAudioPackage from './coreAudioPackage.json';
import { AudioTrack, ResponseData, AudioResponse } from "../types/types";

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
        byId: {},
        allIds: []
    },
    status: 'idle',
    error: null,
}

coreAudioPackage.forEach(track => {
    initialState.tracks.byId[track.id] = {
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
    };
    initialState.tracks.allIds.push(track.id);
});

export const fetchAudioTracks = createAsyncThunk<
    ResponseData,
    void,
    { rejectValue: string }
>(
    'audio/fetchAudioTracks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://sonora-api-2oow.onrender.com/api/audio');
            const audioData: AudioResponse = await response.json();

            if (audioData.data && audioData.data.length > 0) {
                return audioData.data;
            } else {
                console.error(audioData.error);
                return rejectWithValue('Unable to fetch audio tracks');
            }
        } catch (error) {
            console.error(error);
            return rejectWithValue('Unable to fetch audio tracks');
        }
    }
);

export const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setVolume: (state, action: PayloadAction<{trackId: string, volume: number}>) => {
            const { trackId, volume } = action.payload;
            if (state.tracks.byId[trackId]) {
                state.tracks.byId[trackId].volume = volume;
            }
        },
        setPlayStatus: (state, action: PayloadAction<{trackId: string, isPlaying: boolean}>) => {
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
        resetTracks: (state) => {
            state.tracks.allIds.forEach(trackId => {
                state.tracks.byId[trackId].volume = 0;
                state.tracks.byId[trackId].isPlaying = false;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAudioTracks.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchAudioTracks.fulfilled, (state, action: PayloadAction<ResponseData>): AudioState => {
                // Explicitly replace the state with new fetched data
                return {
                    ...state,
                    tracks: {
                        byId: Object.fromEntries(
                            action.payload.map(track => {
                                return [
                                    track._id,
                                    {
                                        id: track._id,
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
                        allIds: action.payload.map(track => track._id)
                    },
                    status: 'succeeded',
                    error: null
                }
            })
            .addCase(fetchAudioTracks.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Unknown Error';
            })
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
