import classes from "./pages.module.css";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {wordSlice} from "../store/reducers/WordSlice";

const GamePage = () => {
    console.log('render game page!')
    const {words,count,winRate} = useAppSelector(state => state.wordReducer)
    const dispatch = useAppDispatch()
    const {increment, winRateInc} = wordSlice.actions
    const randomNumber = () => { return Math.floor(Math.random() * words.length)}
    const randomArray = [words[randomNumber()],words[randomNumber()],words[randomNumber()],words[randomNumber()]];
    const randomWord = Math.floor(Math.random() * 4)
    const choseHandler = (e:any) => {
        console.log(e.target.childNodes[0].data)
        console.log(randomArray[randomWord].eng)
        dispatch(increment(1))
        if(e.target.childNodes[0].data === randomArray[randomWord].eng){
            dispatch(winRateInc(10))
        }
    }

    return (
        <section className={classes.game}>
            <p>step: {count}/10</p>
            <p>win rate:{winRate}%</p>
            <h1>{randomArray[randomWord].rus}</h1>
            <div className={classes.game__container}>
                <p onClick={(e)=>{choseHandler(e)}}>{randomArray[0].eng}</p>
                <p onClick={(e)=>{choseHandler(e)}}>{randomArray[1].eng}</p>
                <p onClick={(e)=>{choseHandler(e)}}>{randomArray[2].eng}</p>
                <p onClick={(e)=>{choseHandler(e)}}>{randomArray[3].eng}</p>
            </div>
        </section>
    )
}

export default  GamePage