import { Link } from "react-router-dom";
import classes from './navigation.module.css'
import React from "react";



function Navigation() {
    console.log('our navigation')
    return (
        <nav className={classes.navigation}>
            <h1 className={classes.navigation__title}>
                <Link className={classes.navigation__link} to='/'>
                    Jeopardy Game
                </Link>
            </h1>
            <div className={classes.statistics__button}>
                <Link className={classes.statistics__link} to='/statistics'>
                    Statistics
                </Link>
            </div>
        </nav>
    )
}

export default Navigation;