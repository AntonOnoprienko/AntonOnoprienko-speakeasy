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
                    No results available. Please press <Link to={'/game'}
                                                             className={classes.results__link}> TEST </Link>
                </p>
            }
            {
                results.map(r =>
                    <div key={r.data} className={classes.resultsPage__info}>
                        <p><span className={classes.results_info__option}>Data:</span><b>    {r.data}   </b></p>
                        <p><span className={classes.results_info__option}>Player name:</span> <b>  {r.playerName}   </b></p>
                        <p><span className={classes.results_info__option}>Right answers:</span> <b>   {r.winRate}%    </b></p>
                        {r.wrongAnswers.length ?
                            <div><span className={classes.results_info__option}>Wrong answers:</span> <ol> {r.wrongAnswers.map(a =>
                                <li key={a}> {a.toUpperCase()}, </li>)} </ol></div> :
                            <b><p style={{color: 'green', fontSize: '18px'}}>Congratulations! Everything is correct!</p>
                            </b>}
                    </div>)
            }
        </div>
    )
}

export default ResultsPage;