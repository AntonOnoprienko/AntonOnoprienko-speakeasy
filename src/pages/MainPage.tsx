import React from "react";
import {useAppSelector} from "../hooks/redux";
import classes from "./pages.module.css";
import {Link} from "react-router-dom";

const MainPage = () => {

    const {words} = useAppSelector(state => state.wordReducer)
    return (
        <section className={classes.dictionary}>
            <p className={classes.dictionary__adding}> <Link to={'/adding'}><button>ADD NEW WORDS</button>
            </Link></p>
            {words.map(w => <div className={classes.dictionary__item} key={w.id}><p
                className={classes.dictionary_item__text}>{w.eng.toUpperCase()}</p> <p className={classes.dictionary_item__text}>{w.rus.toUpperCase()}</p>
            </div>)}

        </section>
    )
}

export default MainPage