import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { extractVideoId, validateYoutubeLink } from "../utils/videoUtils";

type VideoState = {
    searchQuery: string,
    videoId: string | null,
    error: string | null,
}

const initialState: VideoState = {
    searchQuery: '',
    videoId: null,
    error: null,
};

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setVideoSrc: (state, action: PayloadAction<string>) => {
            if (validateYoutubeLink(action.payload)) {
                state.videoId = extractVideoId(action.payload);
                state.error = null;
            } else {
                state.error = !action.payload
                    ? 'Please enter a valid YouTube link.'
                    : 'The YouTube video link you provided is invalid. Please check the URL and try again.';
            }
        },
    }
});

export default videoSlice.reducer;
export const { setSearchQuery, setVideoSrc } = videoSlice.actions;
