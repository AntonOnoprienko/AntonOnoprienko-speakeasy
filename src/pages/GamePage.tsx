import classes from "./pages.module.css";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {wordSlice} from "../store/reducers/WordSlice";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";


const GamePage = () => {
    console.log('render gamePage!')
    const [player,setPlayer] = useState('')
    const {words, count, winRate, playerName, wrongAnswers} = useAppSelector(state => state.wordReducer)
    const dispatch = useAppDispatch()
    const {increment, winRateInc, refreshResults,setName,addResult,setWrongAnswers } = wordSlice.actions

    const randomNumber = () => { return Math.floor(Math.random() * words.length)}
    const randomArray = [words[randomNumber()],words[randomNumber()],words[randomNumber()],words[randomNumber()]];
    const randomWord = Math.floor(Math.random() * 4)

    const choseHandler = (e:any) => {
        dispatch(increment(1))
        if(e.target.childNodes[0].data === randomArray[randomWord].eng){
            dispatch(winRateInc(10))
        } else {
            dispatch(setWrongAnswers(randomArray[randomWord].rus))
        }
        checkResults()
    }
    const checkResults = () => {
        if(count > 10 ){
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
        console.log(player)
    }
    const onChangePlayerName = (event: React.FormEvent<HTMLInputElement>) => {
        setPlayer(event.currentTarget.value)
    }

    useEffect(()=>{
        checkResults()
    },[checkResults])
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


            { playerName && <h1>{randomArray[randomWord].rus}</h1>}
            { playerName && <div className={classes.game__container}>



                <p onClick={(e)=>{choseHandler(e)}}>{randomArray[0].eng}</p>
                <p onClick={(e)=>{choseHandler(e)}}>{randomArray[1].eng}</p>
                <p onClick={(e)=>{choseHandler(e)}}>{randomArray[2].eng}</p>
                <p onClick={(e)=>{choseHandler(e)}}>{randomArray[3].eng}</p>

            </div>}

        </section>
    )
}
export default  GamePage;