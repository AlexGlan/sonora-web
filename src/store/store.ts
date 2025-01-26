import { combineReducers, configureStore } from "@reduxjs/toolkit";
import audioSlice from "./audioSlice";
import videoSlice from "./videoSlice";

const rootReducer = combineReducers({
    'audio': audioSlice,
    'video': videoSlice,
});

export const setupStore = (preloadedState: Partial<RootState> = {}) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
