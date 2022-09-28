import classes from "./pages.module.css";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {wordSlice} from "../store/reducers/WordSlice";
import React, {useEffect, useState} from "react";
const GamePage = () => {
    const [player,setPlayer] = useState('')
    const {words,count,winRate,playerName} = useAppSelector(state => state.wordReducer)
    const dispatch = useAppDispatch()
    const {increment, winRateInc, refreshResults,setName,addResult } = wordSlice.actions

    const randomNumber = () => { return Math.floor(Math.random() * words.length)}
    const randomArray = [words[randomNumber()],words[randomNumber()],words[randomNumber()],words[randomNumber()]];
    const randomWord = Math.floor(Math.random() * 4)

    const choseHandler = (e:any) => {
        dispatch(increment(1))
        if(e.target.childNodes[0].data === randomArray[randomWord].eng){
            dispatch(winRateInc(10))
        }
        checkResults()
    }
    const checkResults = () => {
        if(count === 10 ){
            let result = {
                id: Date.now(),
                data: new Date().toLocaleString("en-US"),
                name: playerName,
                winRate: winRate
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
            <div className={classes.game__header}>
                <p>step: {count}/10</p>
                <p>Player: {playerName}</p>
            </div>
            {!playerName && <div className={classes.game__input}><input onChange={(event) => onChangePlayerName(event)} type={'text'}
                                        placeholder={'insert name'} value={player}/>
                <button type={"submit"} onClick={()=>playerNameSubmit()}>ok</button></div>}


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

export default  GamePage