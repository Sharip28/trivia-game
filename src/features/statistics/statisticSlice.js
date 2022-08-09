import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    questionsQuantity: 0,
    trueAnswers: 0,
    wrongAnswers: 0,
    scores: 0,
    creationTime: 'now',
    finishTime: 'finishedTime',
}

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        value: initialState,
    },
    reducers: {
        updateStatistics: (state, action) => {
            state.value.scores += action.payload;
            state.value.questionsQuantity++;
            {
                action.payload > 0
                    ? state.value.trueAnswers++
                    : state.value.wrongAnswers++
            }
        },
        addCreationTime: (state) => {
            let date = new Date();
            state.value.creationTime = `${date.getDate()}/
            ${date.getMonth() > 10 ? '0' + date.getMonth() : date.getMonth()}/
            ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        },
        addFinishTime: (state) => {
            let date = new Date();
            state.value.finishTime = `${date.getDate()}/
            ${date.getMonth() > 10 ? '0' + date.getMonth() : date.getMonth()}/
            ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        },
        clearStatistics: (state) => {
            state.value = {
                questionsQuantity: 0,
                trueAnswers: 0,
                wrongAnswers: 0,
                scores: 0,
                creationTime: 'now',
                finishTime: 0,
            }

        }
    }

})

export const { updateStatistics, addCreationTime, addFinishTime, clearStatistics

} = statisticsSlice.actions

export const selectStatistics = (state) => state.statistics.value

export default statisticsSlice.reducer