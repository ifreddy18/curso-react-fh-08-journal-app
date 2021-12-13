import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';


import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startLoginWithGoogle } from '../../actions/auth';
import { removeErrorAction, setErrorAction } from '../../actions/ui';


export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );
    
    const [ formValues, handleInputChange ] = useForm({
        email: 'freddy@mail.com',
        password: '123456'
    });
    
    const { email, password } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch( login(12345, 'Freddy desde dispatch') );
        
        if ( isFormValid() ) {
            dispatch( startLoginEmailPassword(email, password) );
        }

    }

    const isFormValid = () => {

        if ( !validator.isEmail(email) ) {
            dispatch( setErrorAction('Invalid email') );
            return false;
        } else if ( password.length < 6 ) {
            dispatch( setErrorAction('Invalid password') );
            return false;
        }

        dispatch( removeErrorAction() );

        return true;
    };

    const handleGoogleLogin = () => {
        dispatch( startLoginWithGoogle() );
    }
    
    return (
        <>
            <h3 className='auth__title'>Login</h3>

            <form onSubmit={ handleSubmit }>
                
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className='btn btn-primary btn-block mb-1'
                    disabled={ loading }
                >
                    Login
                </button>

                <hr />

                <p className='auth__social-title'>
                    Login with Gmail account
                </p>
            
            </form>

            <div 
                className="google-btn"
                onClick={ handleGoogleLogin }
            >
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <p className="btn-text">
                    <b>Sign in with google</b>
                </p>
            </div>

            <Link 
                to="/auth/register"
                className='link'
            >
                Create new account
            </Link>
        </>
    )
}
