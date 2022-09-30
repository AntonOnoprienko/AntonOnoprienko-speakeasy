import classes from "./pages.module.css";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {wordSlice} from "../store/reducers/WordSlice";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {IWord} from "../models/IWords";

const GamePage = () => {
    console.log('render gamePage!')
    const [player, setPlayer] = useState('')
    const {tempWords, count, winRate, playerName, wrongAnswers} = useAppSelector(state => state.wordReducer)
    const dispatch = useAppDispatch()
    const {increment, winRateInc, refreshResults, setName, addResult, setWrongAnswers, removeWord,createTempState} = wordSlice.actions
    const randomNumber = (tempWords: IWord[]) => {
        return Math.floor(Math.random() * tempWords.length)
    };
    const randomWord = Math.floor(Math.random() * 4)
    let uniqueArray: IWord[] = []

    const randomWords = (tempWords: IWord[]): IWord[] => {
        let newWord: IWord = tempWords[randomNumber(tempWords)];
        if (!uniqueArray.includes(newWord) && uniqueArray.length < 4) uniqueArray = uniqueArray.concat(newWord)
        if (uniqueArray.length < 4) {
            return randomWords(tempWords);
        }
        return uniqueArray;
    }

    const choseHandler = (e: any) => {
        dispatch(increment(1))
        if (e.target.childNodes[0].data === randomWords(tempWords)[randomWord].eng) {
            dispatch(winRateInc(10))
            dispatch(removeWord(randomWords(tempWords)[randomWord].id))
        } else {
            dispatch(setWrongAnswers(randomWords(tempWords)[randomWord].rus))
        }
        checkResults()
    }
    const checkResults = () => {
        if (count > 10) {
            let result = {
                id: Date.now(),
                data: new Date().toLocaleString("en-US"),
                playerName,
                winRate,
                wrongAnswers
            }
            dispatch(addResult(result))
            dispatch(refreshResults())

        }
    }
    const playerNameSubmit = () => {
        dispatch(setName(player))
        dispatch(createTempState())
        console.log(player)
    }
    const onChangePlayerName = (event: React.FormEvent<HTMLInputElement>) => {
        setPlayer(event.currentTarget.value)
    }

    useEffect(() => {
        checkResults()
    }, [checkResults])
    return (
        <section className={classes.game}>
            {count > 10 && <Navigate to='/results'/>}
            <div className={classes.game__header}>
                <p>step: {count}/10</p>
                <p>Player: {playerName}</p>
            </div>
            {!playerName && <div className={classes.game_input__modal}>
                <div className={classes.game_input__container}>
                    <h2>INSERT NAME PLEASE!!</h2>
                    <div>
                        <input maxLength={20} onChange={(event) => onChangePlayerName(event)} type={'text'}
                               placeholder={'insert name'} value={player}/>
                        <button type={"submit"} onClick={() => playerNameSubmit()}>ok</button>
                    </div>
                </div>
            </div>}
            {playerName && <h1>{randomWords(tempWords)[randomWord].rus}</h1>}
            {playerName && <div className={classes.game__container}>
                {randomWords(tempWords).map(w => <p onClick={(e) => {
                    choseHandler(e)
                }} key={w.id}>{w.eng}</p>)}
            </div>}
        </section>
    )
}
export default GamePage;