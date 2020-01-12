import { GET_UML_SVG } from './types';

export const getUMLPNGAction = () => dispatch => {
    dispatch({
        type: GET_UML_SVG,
        payload: null
    })
}