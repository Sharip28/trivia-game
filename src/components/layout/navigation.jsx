import { Link } from "react-router-dom";
import classes from './navigation.module.css'
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout, selectUser } from "../../features/game/loggedSlice";
import { clearStatistics, selectStatistics } from '../../features/statistics/statisticSlice'
import { renewClues } from "../../features/game/cluesSlice";
import { finishGame } from "../../features/game/starterSlice";

function Navigation() {
    const statistics = useSelector(selectStatistics)
    const user = useSelector(selectUser)


    const dispatch = useDispatch()


    console.log('our navigation', statistics)
    return (
        user && (
            <nav className={classes.navigation}>

                <h1 className={classes.navigation__title}>
                    <Link className={classes.navigation__link} to='/'>
                        Jeopardy Game
                    </Link>
                </h1>

                <div className={classes.navStats}>
                    <span>points you've got: </span>
                    <span>
                        {statistics
                            ? statistics.scores
                            : 0
                        }
                    </span>
                </div>
                <div className={classes.statistics__button}>
                    <Link className={classes.statistics__link} to='/statistics'>
                        Statistics
                    </Link>
                </div>
                <div
                    className={classes.statistics__button}
                    onClick={() => {
                        dispatch(logout())
                        setTimeout(() => {
                            dispatch(renewClues());
                            dispatch(clearStatistics());
                            dispatch(finishGame())

                        }, 1000)
                    }}
                >
                    <Link to='/'>
                        Logout

                    </Link>
                </div>
            </nav>
        )

    )
}

export default Navigation;