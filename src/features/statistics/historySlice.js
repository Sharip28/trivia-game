import { createSlice } from '@reduxjs/toolkit'


export const historySlice = createSlice({
    name: 'history',
    initialState: {
        value: [],
    },
    reducers: {
        addHistory: (state, action) => {
            state.value.push(action.payload)

        },
        clearHistory: (state) => {
            state.value = []
        }
    },
})

export const { addHistory, clearHistory } = historySlice.actions;

export const selectHistory = (state) => state.history.value

export default historySlice.reducer;
