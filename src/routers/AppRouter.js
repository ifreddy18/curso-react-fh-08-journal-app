import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { onAuthStateChanged, auth } from '../firebase/firebase-config';

import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../components/journal/JournalScreen'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

export const AppRouter = () => {

	const dispatch = useDispatch();

	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if ( user?.uid ) {
				dispatch( login( user.uid, user.displayName ) );
				setIsLoggedIn( true );
			} else {
				setIsLoggedIn( false );
			}

			setChecking(false);
		});

	}, [ dispatch, setChecking ]); // dispatch no cambia, pero se usa como dependencia para evitar warning

	if ( checking ) {
		return (
			<h1>Cargando...</h1>
		)
	}

	return (
		<BrowserRouter>

			<Routes>
				<Route path="/auth" element={<AuthRouter />} />
				<Route path="/" element={<JournalScreen />} />
				<Route path="*" element={<AuthRouter />} />
			</Routes>

		</BrowserRouter>
	)
}
