import classes from './layout.module.css'
import { NavLink, Outlet } from 'react-router-dom'

const setActive = ({isActive}:any) => isActive? classes.active_link:'';
export const Layout = () => {
    return (
        <>
            <header className={classes.header}>
                    <nav>
                        <ol className={classes.navbar__list }>
                            <NavLink to={'/main'} className={setActive}>
                                <li className={classes.navbar__item}>Main</li>
                            </NavLink>
                            <NavLink to={'/adding'} className={setActive}>
                                <li className={classes.navbar__item}>Add words</li>
                            </NavLink>
                            <NavLink to={'/game'} className={setActive}>
                                <li className={classes.navbar__item}>Check yourself</li>
                            </NavLink>
                            <NavLink to={'/results'} className={setActive }>
                                <li className={classes.navbar__item}>Results</li>
                            </NavLink>
                        </ol>
                    </nav>
            </header>
            <main className={classes.main}>
                <div className={classes.container}>
                    <Outlet />
                </div>
            </main>
            <footer>
                <div className={classes.container}>
                    2022
                </div>
            </footer>
        </>
    )
}