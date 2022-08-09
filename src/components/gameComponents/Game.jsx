import { React, useState, useEffect } from 'react'
import classes from './Game.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { selectUser } from '../../features/game/loggedSlice'
import { selectStarter, startGame, finishGame } from '../../features/game/starterSlice'
import { renewClues, selectClues, setInitialState } from '../../features/game/cluesSlice'
import { addCreationTime, addFinishTime, clearStatistics, selectStatistics } from '../../features/statistics/statisticSlice'



import Login from '../form/login'
import TableOfClues from './tableOfClues'

import { takeOutCategories } from '../../utils/takeOutCategories'
import { getClues } from '../../utils/api'
import { addHistory } from '../../features/statistics/historySlice'



function Game() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const starter = useSelector(selectStarter)
    const clues = useSelector(selectClues)
    const statistics = useSelector(selectStatistics)

    const [responseStatus, setResponseStatus] = useState('choose the clue');
    const [responseScore, setResponseScore] = useState(0);

    useEffect(() => {
        if (clues.length === 0) {
            getClues().then((data) => {
                dispatch(setInitialState(takeOutCategories(data)))
            })
        }
    }, [clues.length])

    const finishHandler = () => {
        dispatch(addFinishTime())
        const date = new Date();
        let finishTime = `${date.getDate()}/
        ${date.getMonth() > 10 ? '0' + date.getMonth() : date.getMonth()}/
        ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        dispatch(addHistory({ ...statistics, finishTime }))
        setTimeout(() => {
            dispatch(renewClues());
            dispatch(clearStatistics());
            dispatch(finishGame())

        }, 1000)
    }


    return (
        <>
            {!user ? (<Login />) : !starter ?
                (<div className={classes.start__button__container} >
                    <button
                        className={classes.start__button}
                        onClick={() => {
                            dispatch(startGame())
                            dispatch(addCreationTime())
                        }}>
                        Start
                    </button>
                </div>) : (
                    <div className={classes.game}>
                        {clues.length > 0 ? (

                            <TableOfClues
                                clues={clues}
                                setResponseStatus={setResponseStatus}
                                setResponseScore={setResponseScore}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                        <div className={classes.gameStatus}>
                            {responseScore === 0 ? null : responseScore > 0 ? (
                                <div className={classes.statusResponseCorrect}>
                                    <p className={classes.statusText} >{responseStatus}</p>
                                    <p className={classes.statusScore} >{responseScore} points</p>
                                </div>
                            ) : (
                                <div className={classes.statusResponseWrong}>
                                    <p className={classes.statusText} >{responseStatus}</p>
                                    <p className={classes.statusScore} >{responseScore} points</p>
                                </div>
                            )}
                        </div>

                        <div className={classes.finish__button__container}>
                            <button
                                className={classes.finish__button}
                                onClick={() => {
                                    finishHandler()
                                }}>
                                Finish
                            </button>
                        </div>
                    </div>
                )

            }</>


    )
}

export default Game