import classes from './layout.module.css'
import {NavLink, Outlet} from 'react-router-dom'
import logo from '../../assests/logo.png'

export const Layout = () => {
    const setActive = ({isActive}: any) => isActive ? classes.active_link : '';
    return (
        <>
            <header className={classes.header}>
                <nav className={classes.container}>
                    <ol className={classes.navbar__list}>
                        <NavLink to={'/'}>
                            <li><img src={logo} className={classes.header__logo} alt={'icon by Icons8'}/></li>
                        </NavLink>
                        <NavLink to={'/game'} className={setActive}>
                            <li className={classes.navbar__item}>TEST</li>
                        </NavLink>
                        <NavLink to={'/results'} className={setActive}>
                            <li className={classes.navbar__item}>RESULTS</li>
                        </NavLink>
                    </ol>
                </nav>
            </header>
            <main className={classes.main}>
                <div className={classes.container}>
                    <Outlet/>
                </div>
            </main>
            <footer className={classes.footer}>
                <div className={classes.container}>
                    <div className={classes.footer__content}>
                        <a href={'mailto:onoprienkoanton88@gmail.com'}>onoprienkoanton88@gmail.com</a>
                        <p>2022</p>
                    </div>
                </div>
            </footer>
        </>
    )
}