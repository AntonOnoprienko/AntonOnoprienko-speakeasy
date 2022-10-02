import {useAppSelector} from "../hooks/redux";
import classes from "./pages.module.css";
import {Link} from "react-router-dom";

export const ResultsPage = () => {
    const results = useAppSelector(state => state.wordReducer.playerResults)
    return (
        <div className={classes.resultsPage}>

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
                        {r.wrongAnswers.length ?
                            <p>Wrong answers: {r.wrongAnswers.map(a =>
                                <span key={a}> "{a.toUpperCase()} ", </span>)}</p> :
                            <b><p style={{color: 'green', fontSize: '18px'}}>Congratulations! Everything is correct!</p>
                            </b>}
                    </div>)
            }
        </div>
    )
}

export default ResultsPage;