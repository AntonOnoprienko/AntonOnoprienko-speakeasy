import React from "react";
import {useAppSelector} from "../hooks/redux";
import classes from "./pages.module.css";

const MainPage = () => {

    const {words} = useAppSelector(state => state.wordReducer)
    return (
        <section className={classes.dictionary}>

                {words.map(w => <div className={classes.dictionary__item} key={w.id}> <p className={classes.rus}>{w.rus.toUpperCase()}</p> <p className={classes.eng}>{w.eng.toUpperCase()}</p></div>)}

        </section>
    )
}

export default  MainPage