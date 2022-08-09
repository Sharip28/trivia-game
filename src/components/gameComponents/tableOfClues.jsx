import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import "antd/dist/antd.css";

import classes from './tableOfClues.module.css'
import { Modal } from 'antd'
import { checkClue, markAsTrueIfTrue } from '../../features/game/cluesSlice'
import { updateStatistics } from '../../features/statistics/statisticSlice'



function TableOfClues({ clues, setResponseStatus, setResponseScore }) {
    const dispatch = useDispatch()

    const [selectedClue, setSelectedClue] = useState([0, 0])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputText, setInputText] = useState("")
    const [currentClueAnswer, setCurrentClueAnswer] = useState('')
    const [currentClueValue, setCurrentValue] = useState(0)
    const [timer, setTimer] = useState(10);

    useEffect(() => {

        if (isModalVisible) {
            timer > 0 &&
                setTimeout(() => {
                    setTimer(timer - 1)
                }, 1000)
        }
        if (timer === 0) {
            hideModal();
            submitHandler();
        }
    }, [timer, isModalVisible])


    const displayClues = (clues, classes) => {
        return clues.map((clues, index) => {
            // here clues are categories
            return (
                <div className={classes.category} key={index} >
                    <div className={classes.categoryName}>
                        <h6>{clues[0].category.title}</h6>
                        {/* here clues is the current category */}
                    </div>
                    <div className={classes.categoryClues}>
                        {clues.map((clue, clueIndex) => (
                            // here each clue is a current clue
                            <div
                                key={clue.id}
                                id={`${index}_${clue.id}`}
                                className={classes.clue}
                                onClick={() => {
                                    setSelectedClue([index, clueIndex]);
                                    setCurrentClueAnswer(clue.answer);
                                    setCurrentValue(clue.value);
                                    showModal()
                                }}
                            > {clue.isChecked ? (
                                clue.isTrue ? (
                                    <div className={classes.trueAnswer} >True</div>
                                ) : (
                                    <div className={classes.falseAnswer} >False</div>

                                )
                            ) : (
                                clue.value
                            )}

                            </div>
                        ))}
                    </div>

                </div>
            )
        })


    }

    function showModal() {
        setIsModalVisible(true);
        setTimer(10);
    }
    function hideModal() {
        setIsModalVisible(false)
    }


    function submitHandler() {
        dispatch(checkClue(selectedClue))
        currentClueAnswer === inputText
            ? dispatch(markAsTrueIfTrue([...selectedClue, true]))
            : dispatch(markAsTrueIfTrue([...selectedClue, false]));
        let scoreValue = 0;
        currentClueAnswer === inputText
            ? (scoreValue += currentClueValue)
            : (scoreValue -= currentClueValue)
        if (currentClueAnswer === inputText) {
            setResponseStatus('You earned')
            setResponseScore(currentClueValue)
        } else {
            setResponseStatus('You lost')
            setResponseScore(-currentClueValue)
        }
        dispatch(updateStatistics(scoreValue))
        hideModal();
        setInputText('');


    }

    return (
        <div>
            <div className={classes.container}>
                {displayClues(clues, classes)}
            </div>

            <Modal
                title={clues[selectedClue[0]][selectedClue[1]].question}
                visible={isModalVisible}
                onOk={() => {
                    submitHandler();
                }}
                onCancel={hideModal}
            >
                <p>Answer: {clues[selectedClue[0]][selectedClue[1]].answer}</p>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler();
                }} >
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => {
                            setInputText(e.target.value)
                        }}
                    />
                    <p>Remaining time: {timer}</p>
                </form>
                <p>*You better answer in time, otherwise you will loose</p>
                <p>*Empty answer will be considered as wrong answer</p>
            </Modal>



        </div>
    )

}

export default TableOfClues;