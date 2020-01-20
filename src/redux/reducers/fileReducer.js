import * as types from '../actions/types';


export default (state = [], action) => {
    switch(action.type){
        case types.ADD_NEW_FILE:
            // Add current contents of 
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    src: action.payload.src
                }
            ]
          
            break;
        case types.MODIFY_FILE:
            return state.map(file => {
                if(file.id == action.payload.id){
                     file.src == action.payload.src;
                }
                return file;
            })
            break;
            
        case types.DELETE_FILE:
            return state.filter(file => file.id != action.payload.id); 
            break;
        default:
            return state
    }
}