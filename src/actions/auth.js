import Swal from 'sweetalert2';

import {
	auth,
	googleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
} from "../firebase/firebase-config";

import { types } from "../types/types";
import { notesLogoutCleaning, startLoadingNotes } from './notes';
import { finishLoading, startLoading } from "./ui";

/* 
    Las funciones necesitan retornar una funcion de callback
    porque son asyncronas. Gracias al thunk* se puede retornar
    el dispatch

    thunk*: Importado en el store 
        import thunk from 'redux-thunk';

*/

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {

        dispatch( startLoading() );

        createUserWithEmailAndPassword( auth, email, password )
            .then( async({ user }) => {

                await updateProfile( auth.currentUser , { displayName: name } )
                
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );

            })
            .catch( err => {
                dispatch( finishLoading() );
                Swal.fire('Error', err.message, 'error');
            });

    }
};

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {

        // Simulacion de peticion asyncrona
        // setTimeout(() => {
        //     dispatch( login(123, 'Alejandro') );
        // }, 3500);

        dispatch( startLoading() );
            
        signInWithEmailAndPassword(auth, email, password)
        .then( ({ user }) => {
            
            dispatch( login( user.uid, user.displayName ) );
            dispatch( finishLoading() );
            
        })
        .catch( err => {
            dispatch( finishLoading() );
            Swal.fire('Error', err.message, 'error');
        });
            
    }
};

export const startLoginWithGoogle = ( email, password ) => {
    return ( dispatch ) => {

        signInWithPopup( auth, googleAuthProvider )
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
            });

    }
};

export const startLogout = () => {
    return async( dispatch ) => {
        await signOut(auth)
            .catch( console.log );

        dispatch( logout() );
        dispatch( notesLogoutCleaning() );
        
    }
};


export const login = ( uid, name ) => {
    return {
        type: types.login,
        payload: {
            uid,
            name
        }
    }
};

export const logout = () => ({
    type: types.logout,
})