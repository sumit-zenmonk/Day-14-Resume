"use client"

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CurrLoginReducer from "../feature/curr_login/currLoginSlice";
import AllSignedUpUsersReducer from "../feature/all_signup_users/allUserSlice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['searchMusicReducer',],
};

const rootReducer = combineReducers({
    CurrLoginReducer: CurrLoginReducer,
    AllSignedUpUsersReducer: AllSignedUpUsersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
