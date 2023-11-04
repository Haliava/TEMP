import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({});

export const store = configureStore({
    reducer: rootReducer,
});

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;