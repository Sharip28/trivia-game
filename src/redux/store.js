import { configureStore } from "@reduxjs/toolkit"
import cluesSlice from "../features/game/cluesSlice";
import userReducer from "../features/game/loggedSlice";
import starterReducer from '../features/game/starterSlice'
import historySlice from "../features/statistics/historySlice";
import statisticSlice from "../features/statistics/statisticSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        starter: starterReducer,
        clues: cluesSlice,
        statistics: statisticSlice,
        history: historySlice
    },
})

export default store;