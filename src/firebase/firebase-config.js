import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";

import { 
	getFirestore,
	collection,
	addDoc,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD7WeqZZXrZOqhzhu7ERV7vdqRxNA1XHkU",
	authDomain: "react-app-curso-11066.firebaseapp.com",
	projectId: "react-app-curso-11066",
	storageBucket: "react-app-curso-11066.appspot.com",
	messagingSenderId: "20105345113",
	appId: "1:20105345113:web:175b2a4ff91b4a666c5948"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Auth
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
// Firestore
const db = getFirestore();


export {
	// Auth
	auth,
	createUserWithEmailAndPassword,
	getAuth,
	googleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
	// Firestore
	addDoc,
	db,
	collection,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
};

