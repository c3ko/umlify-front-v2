import { 
    GET_UML_FAILURE, 
    GET_UML_STARTED, 
    GET_UML_SUCCESS 
} from './types';

import axios from 'axios';

const URL = "/api";


export const getUML = (files, imageType) => {
    return dispatch => {
        dispatch(getUMLStarted());
        axios
            .post(`${URL}/uml/svgs`, 
                files
            )
            .then(res => {
                setTimeout(() => {
                    dispatch(getUMLSuccess(res.data))
                })
            })
            .catch(err => {
                dispatch(getUMLFailure(err.message))
            })
    }
}

const getUMLStarted = () => ({
    type: GET_UML_STARTED,

})

const getUMLSuccess = uml => ({
    type: GET_UML_SUCCESS,
    payload: {
        uml
    }
})

const getUMLFailure = err => ({
    type: GET_UML_FAILURE,
    payload: {
        err
    }
})
