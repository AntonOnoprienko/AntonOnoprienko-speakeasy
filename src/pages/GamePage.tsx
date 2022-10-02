import classes from "./pages.module.css";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {wordSlice} from "../store/reducers/WordSlice";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {IWord} from "../models/IWords";

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
    } = wordSlice.actions
    //Создает рандомное число по длине словаря
    const randomNumber = (tempWords: IWord[]) => {
        return Math.floor(Math.random() * tempWords.length)
    };
    const randomWord = Math.floor(Math.random() * 4)
    let uniqueArray: IWord[] = []

    //Создает массив уникальных 4 объектов
    const randomWords = (tempWords: IWord[]): IWord[] => {
        let newWord: IWord = tempWords[randomNumber(tempWords)];
        if (!uniqueArray.includes(newWord) && uniqueArray.length < 4) uniqueArray = uniqueArray.concat(newWord)
        if (uniqueArray.length < 4) {
            return randomWords(tempWords);
        }
        return uniqueArray;
    }

    //Срабатывает при выборе ответа. Если правильный увеличивет % ответов и удаяет слово. Неправильный добавляет в массив не правильных ответов
    const choseHandler = (e: any) => {
        dispatch(increment(1))
        if (e.target.childNodes[0].data === randomWords(tempWords)[randomWord].rus) {
            dispatch(winRateInc(10))
            dispatch(removeWord(randomWords(tempWords)[randomWord].id))
        } else {
            dispatch(removeWord(randomWords(tempWords)[randomWord].id))
            dispatch(setWrongAnswers(randomWords(tempWords)[randomWord].eng))
        }
        checkResults()
    }
    //Создает и отправляет результаты после 10 ответов и обновляет счетчики.
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
    //Добавляет имя и создает копию словаря
    const playerNameSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
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
            {!playerName && <div className={classes.game__modal}>
                <form className={classes.game_modal__form}>
                    <label htmlFor={'name'} className={classes.game_modal__title}>insert your name, please!</label>
                    <input id={'name'} maxLength={20} onChange={(event) => onChangePlayerName(event)} type={'text'}
                           value={player}/>
                    <button type={"submit"} disabled={!player} onClick={(event) => playerNameSubmit(event)}>Submit
                    </button>
                </form>
            </div>}


            <div className={classes.game__header}>
                <p>Player: <b>{playerName}</b></p>
                <p>Step: <b>{count}</b>/10</p>
            </div>
            <div className={classes.game__container}>
                {playerName && <h2 className={ randomWords(tempWords)[randomWord].eng.length < 12 ? classes.game__question : classes.game__question_longName} >{randomWords(tempWords)[randomWord].eng}</h2>}
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