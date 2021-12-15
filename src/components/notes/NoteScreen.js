import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDelenting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector(state => state.notes );    
    const [ formValues, handleInputChange, reset ] = useForm( note )
    const { title, body, url } = formValues;

    // Guarda referencia mutable del Id de la nota activa
    const activeId = useRef( note.id );

    useEffect(() => {

        if ( activeId.current !== note.id ) {
            reset( note );
            activeId.current = note.id;
        }
        
    }, [ note, reset ])

    useEffect(() => {
        
        dispatch( activeNote( activeId, { ...formValues }) );

    }, [ formValues, dispatch ])

    const handleDelete = () => {
        dispatch( startDelenting( activeId.current ) );
    };
    

    return (
        <div className='notes__main-content'>
            
            <NotesAppBar />

            <div className='notes__content'>
                
                <input 
                    type="text"
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    name='title'
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder='What happend today'
                    className='notes__textarea'
                    name='body'
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>
                
                {
                    url &&
                        <div className='notes__image'>
                            <img 
                                src={ url }
                                alt='test'
                            />
                        </div>
                }

            </div>


            <button
                className='btn btn-danger'
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
