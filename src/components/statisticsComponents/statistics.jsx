import React from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../features/game/loggedSlice";
import { finishGame, selectStarter } from "../../features/game/starterSlice";
import { selectStatistics, addCreationTime, addFinishTime, clearStatistics } from "../../features/statistics/statisticSlice";
import { selectHistory, addHistory, clearHistory } from "../../features/statistics/historySlice"
import { renewClues } from "../../features/game/cluesSlice";


import classes from './statistics.module.css'



function Statistics() {

    const dispatch = useDispatch()

    const user = useSelector(selectUser)
    const starter = useSelector(selectStarter)
    const statistics = useSelector(selectStatistics)
    const history = useSelector(selectHistory)
    console.log('statistics>', user)

    const navigate = useNavigate()

    const finishHandler = () => {
        dispatch(addFinishTime())
        let date = new Date();
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
        <div className={classes.statistics}>
            <div className={classes.currentGame}>
                <div className={classes.currentGame__title}>
                    <h5>Current Game</h5>
                </div>
                <div className={classes.curentGame__tableContainer}>
                    <table className={classes.currentGame__table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th># of Questions</th>
                                <th>Correct answered</th>
                                <th>Incorrect answered</th>
                                <th>Total points</th>
                                <th>Created at</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!starter ? null : (
                                <tr>
                                    <td>{user.values.username}</td>
                                    <td>{statistics.questionsQuantity}</td>
                                    <td>{statistics.trueAnswers}</td>
                                    <td>{statistics.wrongAnswers}</td>
                                    <td>{statistics.scores}</td>
                                    <td>{statistics.creationTime}</td>
                                    <td>
                                        <div className={classes.currentGame__buttons}>
                                            <button onClick={() => {
                                                navigate('/')
                                            }} className={classes.buttons__continue}>
                                                Continue
                                            </button>
                                            <button onClick={() => {
                                                finishHandler()
                                            }} className={classes.buttons__finish}>
                                                Finish
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className={classes.gameHistory}>
                <div className={classes.gameHistory__title}>
                    <h5>Game history</h5>
                    <button
                        onClick={() => {
                            dispatch(clearHistory())
                        }}
                        className={classes.gameHistory__clearButton}
                    >Clear</button>
                </div>
                <div className={classes.gameHistory__tableContainer}>
                    <table className={classes.gameHistory__table}>
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Кол-во вопросов</th>
                                <th>Верных ответов</th>
                                <th>Неверных ответов</th>
                                <th>Сумма баллов</th>
                                <th>Создано</th>
                                <th>Завершено</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((data) => {
                                return (
                                    <tr key={data?.creationTime}>
                                        <td>{user.values.username}</td>
                                        <td>{data.questionsQuantity}</td>
                                        <td>{data.trueAnswers}</td>
                                        <td>{data.wrongAnswers}</td>
                                        <td>{data.scores}</td>
                                        <td>{data.creationTime}</td>
                                        <td>{data.finishTime}</td>
                                    </tr>

                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Statistics;