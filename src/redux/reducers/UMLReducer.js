import {
    GET_UML_SUCCESS,
    GET_UML_FAILURE,
    GET_UML_STARTED
} from '../actions/types'

const initialState = {
    loading: false,
    uml: null,
    error: null
}

export default function UMLReducer(state = initialState, action){
    switch(action.type) {
        case GET_UML_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_UML_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                
            }
    }
}