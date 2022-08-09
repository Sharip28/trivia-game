import { React } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../features/game/loggedSlice'
import classes from './login.module.css'
import { useFormik } from 'formik'


function Login() {
    const dispatch = useDispatch()

    const validate = (values) => {
        const errors = {};

        if (!values.username || !values.password) {
            errors.name = 'you have to fill all fields'
        } else if (values.username.length < 2 || values.password.length < 6) {
            errors.name = 'username or password is too short'
        }
        return errors;
    }


    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validate,
        onSubmit: (values) => {
            dispatch(login({ values }))
        }

    });

    return (
        <div className={classes.login}>
            <form className={classes.login__form} onSubmit={formik.handleSubmit}>
                <h1>Login here</h1>
                <div className={classes.inputContainer}>
                    <input
                        id='username'
                        type="username"
                        name="username"
                        placeholder='username'
                        onChange={formik.handleChange}
                        value={formik.values.username}></input>
                    <input
                        id='password'
                        name='password'
                        type="password"
                        placeholder='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}></input>
                    {formik.errors.name ? (
                        <div className={classes.error_message} >{formik.errors.name}</div>
                    ) : null}
                </div>

                <button type='submit' className='submit__btn'>Submit</button>
            </form>
        </div>
    )
}

export default Login