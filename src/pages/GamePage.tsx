import classes from "./pages.module.css";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {wordSlice} from "../store/reducers/WordSlice";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {IWord} from "../models/IWords";

const GamePage = () => {
    console.log('render gamePage 1')
    const [player, setPlayer] = useState('')
    const {words, count, winRate, playerName, wrongAnswers} = useAppSelector(state => state.wordReducer)
    const dispatch = useAppDispatch()
    const {increment, winRateInc, refreshResults, setName, addResult, setWrongAnswers} = wordSlice.actions
    let uniqueArray: IWord[] = [] // якесь 1 слово

    const randomWords = (words: IWord[]): IWord[] => {
        let newWord: IWord = getRandomWord(words); // запи
        if (!uniqueArray.includes(newWord) && uniqueArray.length < 4) uniqueArray = uniqueArray.concat(newWord)
        if (uniqueArray.length < 4) { // сама ця функція, бо якшо та то робимо з оригінальним словом, о кинь скрін
            return randomWords(words);
        }
        return uniqueArray;
    }

    let prevNumber: number = -1;
    let newNumber: number = -1;
    const getRandomNumber = (numberPrev: number): number => {
        prevNumber = numberPrev;
        const number = Math.floor(Math.random() * uniqueArray.length)
        if (prevNumber === number) {
            return getRandomNumber(prevNumber)
        }
        return number;
    }
// получаємо рандомне слово
    const getRandomWord = (words: IWord[]) => {
        return words[newNumber] as IWord;
    }
    const randomArray = randomWords(words);


    const choseHandler = (e: any, index: number): void => {
        dispatch(increment(1))
        if (e.target.childNodes[0].data === randomArray[index].eng) {
            dispatch(winRateInc(10))
        } else dispatch(setWrongAnswers(randomArray[index].rus))


        checkResults()
    }
    const checkResults = () => {
        if (count === 11) {
            let result = {
                data: new Date().toLocaleString("en-US"),
                playerName,
                winRate,
                wrongAnswers
            }
            dispatch(addResult(result))
            dispatch(refreshResults())
            console.log('Navigator doesnt work')
        }
    }
    const playerNameSubmit = () => {
        dispatch(setName(player))
        console.log(player)
    }
    const onChangePlayerName = (event: React.FormEvent<HTMLInputElement>) => {
        setPlayer(event.currentTarget.value)
    }

    useEffect(() => {
        checkResults()
    }, [checkResults])

    const getSelections = (): void => {
        if (randomArray.length === 4) {
            const selections = randomArray.map((selection, index) => {
                newNumber = getRandomNumber(prevNumber)
                return (
                    <p key={index} onClick={() => {
                        choseHandler(selection, index)
                    }}>
                        {randomArray[index].eng}
                    </p>
                )
            })
        }
    }
}
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
                    <input onChange={(event) => onChangePlayerName(event)} type={'text'}
                           placeholder={'insert name'} value={player}/>
                    <button type={"submit"} onClick={() => playerNameSubmit()}>ok</button>
                </div>
            </div>
        </div>}


        {playerName && <h1>{randomArray[newNumber].rus}</h1>}
        {playerName && <div className={classes.game__container}></div>}

        {getSelections()}
        {/* <p onClick={(e) => {
                    choseHandler(e)
                }}>{randomArray[0].eng}</p>
                <p onClick={(e) => {
                    choseHandler(e)
                }}>{randomArray[1].eng}</p>
                <p onClick={(e) => {
                    choseHandler(e)
                }}>{randomArray[2].eng}</p>
                <p onClick={(e) => {
                    choseHandler(e)
                }}>{randomArray[3].eng}</p> */}
    </section>
)
}

export default GamePage;