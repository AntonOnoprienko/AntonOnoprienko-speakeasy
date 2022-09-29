import {useAppSelector} from "../hooks/redux";
import classes from "./pages.module.css";

export const ResultsPage = () => {
    const results = useAppSelector(state => state.wordReducer.playerResults)
    return (
        <div style={{padding: '30px'}}>
            {results.map(r => <div key={r.data} className={classes.results}><p><span>Data:</span>{r.data}</p><p><span>Player name:</span> {r.playerName}</p> <p><span>Right answers:</span> {r.winRate}%</p> <p>Wrong answers: {r.wrongAnswers.map(a => <span key={a}> {a}, </span>) }   </p> </div> ) }

        </div>
    )
}

export default ResultsPage;