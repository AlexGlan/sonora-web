import { combineReducers, configureStore } from "@reduxjs/toolkit";
import audioSlice from "./audioSlice";

const rootReducer = combineReducers({
    'audio': audioSlice,
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
