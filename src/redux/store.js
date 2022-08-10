import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


import { configureStore, combineReducers } from "@reduxjs/toolkit"
import cluesSlice from "../features/game/cluesSlice";
import userReducer from "../features/game/loggedSlice";
import starterReducer from '../features/game/starterSlice'
import historySlice from "../features/statistics/historySlice";
import statisticSlice from "../features/statistics/statisticSlice";


const rootReducer = combineReducers({
    user: userReducer,
    starter: starterReducer,
    clues: cluesSlice,
    statistics: statisticSlice,
    history: historySlice,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export default store;