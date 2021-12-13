import { types } from "../types/types";

/*
    {
        uid: 'asdasdasdasdas'
        name: 'Freddy'
    }
*/

// const initialState = {
//     uid: 12345,
//     name: 'Freddy',
//     dir: {
//         b: 12
//     }
// };

export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.name,
            };

        case types.logout:
            return {};

        default:
            return state;
    }

};