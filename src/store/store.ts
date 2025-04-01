import { combineReducers, configureStore } from "@reduxjs/toolkit";
import audioSlice from "./audioSlice";
import videoSlice from "./videoSlice";

const rootReducer = combineReducers({
    audio: audioSlice,
    video: videoSlice,
});

export const setupStore = (preloadedState: Partial<RootState> = {}) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

// Retrieve previously saved audio track data from localStorage
const savedAudioTracks = localStorage.getItem('audioTrackState');
let preloadedState: Partial<RootState> | undefined;

if (savedAudioTracks) {
    // If data exists, initialize the store with the saved tracks
    preloadedState = {
        audio: {
            tracks: JSON.parse(savedAudioTracks),
            status: 'idle',
            error: null,
        }
    }
} else {
    // If no saved state is found, use the default initial state
    preloadedState = undefined;
}

const store = setupStore(preloadedState);

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
export default store;