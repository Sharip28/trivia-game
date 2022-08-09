import { createSlice } from '@reduxjs/toolkit'


export const cluesSlice = createSlice({
    name: 'clues',
    initialState: {
        value: [],
    },
    reducers: {
        setInitialState: (state, action) => {
            state.value = action.payload;
        },
        renewClues: (state) => {
            state.value = [];
        },
        checkClue: (state, action) => {
            state.value[action.payload[0]][action.payload[1]].isChecked = true;
        },
        markAsTrueIfTrue: (state, action) => {
            state.value[action.payload[0]][action.payload[1]].isTrue =
                action.payload[2];
        }
    }
})

export const { setInitialState, renewClues, checkClue, markAsTrueIfTrue } = cluesSlice.actions;
export const selectClues = (state) => state.clues.value

export default cluesSlice.reducer;