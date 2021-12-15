import Swal from 'sweetalert2';

import {
    addDoc,
	db,
	collection,
    doc,
    updateDoc,
    deleteDoc,
} from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {

            const docRef = await addDoc(
                collection(db, `${ uid }/journal/notes`), 
                newNote
            );
            
            dispatch( activeNote( docRef.id, newNote ) );
            dispatch( addNewNote( docRef.id, newNote ) );

        } catch(e) {
            console.error("Error adding document: ", e);
        }

    };
};

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );

    };
};

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        // Condicional preventivo por si acaso Firebase no almacena undefined
        if ( !note.url ) {
            delete note.url;
        }

        const noteToFirestore = { ...note }
        delete noteToFirestore.id;

        const docRef = doc(db, `${ uid }/journal/notes/${ note.id }`);
        await updateDoc( docRef, noteToFirestore);

        dispatch( refresNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success');

    };
};


export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) )

        Swal.close();
    }
};

export const startDelenting = ( id ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const docRef = doc(db, `${ uid }/journal/notes/${ id }`)
        await deleteDoc(docRef);

        dispatch( deleteNote( id ) );

    };
};


// Actions

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id, 
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, 
        ...note
    }
})


export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

// Esta note viene sin id
export const refresNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id, 
            ...note
        }
    }
});

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const notesLogoutCleaning = () => ({
    type: types.notesLogoutCleaning,
});