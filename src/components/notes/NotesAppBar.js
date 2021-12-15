import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector(state => state.notes);
    const { date } = note;

    const noteDate = moment(date).format('dddd, MMMM Do YYYY');

    const handleSaveNote = () => {
        dispatch( startSaveNote( note ) )
    };

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();

    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading(file) );
        }
    };

    return (
        <div className='notes__appbar'>
            <span>{ noteDate }</span>

            <input 
                id='fileSelector'
                type='file'
                name='file'
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />


            <div>
                <button 
                    className='btn'
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className='btn'
                    onClick={ handleSaveNote }
                >
                    Save
                </button>
            </div>

        </div>
    )
}
