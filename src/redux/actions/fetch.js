import { 
    GET_UML_FAILURE, 
    GET_UML_STARTED, 
    GET_UML_SUCCESS 
} from './types';

DEV_URL = "http://localhost:8080";


export const getUML = (files, imageType) => {
    return dispatch => {
        dispatch(getUMLStarted());

        axiox
            .post(`${DEV_URL}/${imageType}`, {
                
            })
    }
}

const getUMLStarted = () => ({
    type: GET_UML_STARTED,

})

const getUMLSuccess = uml