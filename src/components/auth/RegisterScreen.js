import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setErrorAction, removeErrorAction } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: 'Freddy',
        email: 'freddy@mail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            console.log('Formulario valido');
            dispatch( startRegisterWithEmailPasswordName( email, password, name) );
        }

    };

    const isFormValid = () => {

        if ( name.trim().length === 0 ) {
            dispatch( setErrorAction('Name required') );
            return false;
        } else if ( !validator.isEmail(email) ) {
            dispatch( setErrorAction('Invalid email') );
            return false;
        } else if ( password !== password2 || password.length < 6 ) {
            dispatch( setErrorAction('Password invalid or doesn\'t match') );
            return false;
        }

        dispatch( removeErrorAction() );

        return true;
    };

    return (
        <>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={ handleSubmit }>

                {
                    msgError && (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }
                
                <input 
                    type='text'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    className='auth__input'
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    className='auth__input'
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type='password'
                    placeholder='Repeat password'
                    name='password2'
                    className='auth__input'
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5'
                    disabled={ loading }
                >
                    Register
                </button>

                <Link 
                    to='/auth/login'
                    className='link'
                >
                    Login with existent account
                </Link>
            
            </form>
        </>
    )
}
