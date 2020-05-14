import { 
    GET_UML_FAILURE, 
    GET_UML_STARTED, 
    GET_UML_SUCCESS 
} from './types';

import axios from 'axios';

const DEV_URL = "http://localhost:8080";


export const getUML = (files, imageType) => {
    console.log(`${DEV_URL}/uml/${imageType}`)
    console.log(files)
    return dispatch => {
        dispatch(getUMLStarted());
        axios
            .post(`${DEV_URL}/uml/svgs`, 
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