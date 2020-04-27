import * as types from '../actions/types';

export const NAME_ENTRY = "NAME_ENTRY";
export const CODE_ENTRY = "CODE_ENTRY";
export const IDLE = "IDLE";

const initialState = {
    allIds: [],
    byIds: {

    },
    selectedId: null,
    newFileEntry: false,
    
}

function filterObject(object, key){
    let newObject = object;
    delete newObject[key];
    return newObject; 
}
export default (state = initialState, action) => {
    console.log(Object.values(state.byIds));
    switch(action.type){
        case types.ADD_NEW_FILE: {
            const { id } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id] : {
                        id,
                        name: '',
                        src: '',
                        editingName: true,
                        editingCode: false,
                    },
                },
                selectedId: id,
                newFileEntry: true
            }
        }
        case types.START_MODIFY_FILE_NAME: {
            const { id } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        editingName: true,
                    }
                }
            }
        }
        case types.MODIFY_FILE_NAME: {
            const { id, name } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id] : {
                        ...state.byIds[id],
                        name,
                        editingName: false,
                    }
                },
                newFileEntry: false
            }

        }
        case types.TOGGLE_SELECT_FILE: {
            const { id } = action.payload;
            return {
                ...state,
                selectedId: id,
                editingCode: true
            }
        }

        case types.MODIFY_FILE_SRC: {
            const { id, src} = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id] : {
                        id,
                        name: state.byIds[id].name,
                        src,
                        editingCode: false
                    }
                },
                
            }
        }  
        case types.DELETE_FILE: {
            const { id } = action.payload;
            return {
                ...state,
                allIds: state.allIds.filter(fileId => fileId === id),
                byIds: filterObject(state.byIds, id),
                selectedId: state.selectedId - 1
            }
        }
        case types.DELETE_ALL_FILES: {
            return initialState;
        }
        default:
            return state

        
    }
    
}