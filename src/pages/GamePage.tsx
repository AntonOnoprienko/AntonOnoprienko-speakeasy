import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Navigate} from "react-router-dom";
import {wordSlice} from "../store/reducers/WordSlice";
import {IWord} from "../models/IWords";
import classes from "./pages.module.css";

const GamePage = () => {
    const [player, setPlayer] = useState('')
    const {tempWords, count, winRate, playerName, wrongAnswers} = useAppSelector(state => state.wordReducer)
    const dispatch = useAppDispatch()
    const {
        increment,
        winRateInc,
        refreshResults,
        setName,
        addResult,
        setWrongAnswers,
        removeWord,
        createTempState
    } = wordSlice.actions;
    let uniqueArray: IWord[] = []
    const randomWord = (tempWords: IWord[]) => {
        return Math.floor(Math.random() * tempWords.length)
    };
    const randomNum = Math.floor(Math.random() * 4)
    const randomWords = (tempWords: IWord[]): IWord[] => {
        let newWord: IWord = tempWords[randomWord(tempWords)];
        if (!uniqueArray.includes(newWord) && uniqueArray.length < 4) uniqueArray = uniqueArray.concat(newWord)
        if (uniqueArray.length < 4) {
            return randomWords(tempWords);
        }
        return uniqueArray;
    }
    const choseHandler = (e: any) => {
        dispatch(increment(1))
        if (e.target.childNodes[0].data === randomWords(tempWords)[randomNum].rus) {
            dispatch(winRateInc(10))
        } else {
            dispatch(setWrongAnswers(randomWords(tempWords)[randomNum].eng))
        }
        dispatch(removeWord(randomWords(tempWords)[randomNum].id))
    }
    const submitResults = useCallback(() => {
        let result = {
            id: Date.now(),
            data: new Date().toLocaleString("en-US"),
            playerName,
            winRate,
            wrongAnswers
        }
        dispatch(addResult(result))
        dispatch(refreshResults())

    }, [
        playerName,
        winRate,
        wrongAnswers,
        dispatch,
        addResult,
        refreshResults
    ]);
    const submitPlayerName = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(setName(player))
        dispatch(createTempState())
    }
    const onChangePlayerName = (event: React.FormEvent<HTMLInputElement>) => {
        setPlayer(event.currentTarget.value)
    }

    useEffect(() => {
        if (count > 10) {
            submitResults()
        }
    }, [submitResults, count])
    return (
        <section className={classes.game}>
            {!playerName && <div className={classes.game__modal}>
                <form className={classes.game_modal__form}>
                    <label htmlFor={'name'} className={classes.game_modal__title}>insert your name, please!</label>
                    <input id={'name'} maxLength={20} onChange={(event) => onChangePlayerName(event)} type={'text'}
                           value={player}/>
                    <button type={"submit"} disabled={!player} onClick={(event) => submitPlayerName(event)}>Submit
                    </button>
                </form>
            </div>}
            <div className={classes.game__header}>
                <p>Player: <b>{playerName}</b></p>
                <p>Step: <b>{count}</b>/10</p>
            </div>
            <div className={classes.game__container}>
                {playerName &&
                    <h2 className={randomWords(tempWords)[randomNum].eng.length < 12 ? classes.game__question : classes.game__question_longName}>
                        {randomWords(tempWords)[randomNum].eng}</h2>}
                {playerName && <div className={classes.game__answers}>
                    {randomWords(tempWords).map(w => <p className={classes.game_answers__item} onClick={(e) => {
                        choseHandler(e)
                    }} key={w.id}>{w.rus}</p>)}
                </div>}
            </div>
            {count > 10 && <Navigate to='/results'/>}
        </section>
    )
}
export default GamePage;