import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { onAuthStateChanged, auth } from '../firebase/firebase-config';
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

	const dispatch = useDispatch();

	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, async(user) => {
			if ( user?.uid ) {
				dispatch( login( user.uid, user.displayName ) );
				setIsLoggedIn( true );

				// const notes = await loadNotes( user.uid );
				// dispatch( setNotes( notes ) )

				dispatch( startLoadingNotes( user.uid ) );

			} else {
				setIsLoggedIn( false );
			}

			setChecking(false);
		});

	}, [ dispatch, setChecking ]); // dispatch no cambia, pero se usa como dependencia para evitar warning

	if ( checking ) {
		return (
			<h1>Loading...</h1>
		)
	}

	return (
		<BrowserRouter>

			<Routes>

				{/* <Route path="/auth" element={<AuthRouter />} /> */}
				<Route 
					path="/*" 
					element={
						<PublicRoute isLoggedIn={ isLoggedIn }>
							<AuthRouter />
						</PublicRoute>
					} 
				/>

				{/* <Route path="/" element={<JournalScreen />} /> */}
				<Route 
					path="/" 
					element={
						<PrivateRoute isLoggedIn={ isLoggedIn }>
							<JournalScreen />
						</PrivateRoute>
					} 
				/>

				{/* <Route path="*" element={ <AuthRouter /> } /> */}

			
			</Routes>

		</BrowserRouter>
	)
}
