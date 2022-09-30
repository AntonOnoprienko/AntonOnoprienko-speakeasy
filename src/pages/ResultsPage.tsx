import {useAppSelector} from "../hooks/redux";
import classes from "./pages.module.css";
import {Link} from "react-router-dom";

export const ResultsPage = () => {
    const results = useAppSelector(state => state.wordReducer.playerResults)
    return (
        <div style={{padding: '30px'}}>
            {
                !results[0] &&
                <p className={classes.withoutResults}>
                    No results available. Please press <Link to={'/game'}> check yourselves</Link>
                </p>
            }
            {
                results.map(r =>
                    <div key={r.data} className={classes.results}>
                        <p><span>Data:</span>{r.data}</p>
                        <p><span>Player name:</span> {r.playerName}</p>
                        <p><span>Right answers:</span> {r.winRate}%</p>
                        <p>Wrong answers:
                            {r.wrongAnswers.map(a =>
                                <span key={a}> "{a.toUpperCase()}", </span>)}
                        </p>
                    </div>)
            }

        </div>
    )
}

export default ResultsPage;