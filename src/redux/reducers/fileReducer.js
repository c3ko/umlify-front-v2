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
    enteringName: false,
    prevSelectedId: null
}

function filterObject(object, key){
    let newObject = object;
    delete newObject[key];
    return newObject; 
}
export default (state = initialState, action) => {
    switch(action.type){
        case types.ADD_DROPPED_FILES: {
            const { fileList } = action.payload;
            const filesByIds = {}
            fileList.map(file => {
                filesByIds[file.id] = {
                    id: file.id,
                    name: file.name,
                    src: file.src,
                    editingName: false,
                    editingCode: false,
                    newBlankEntry: false
                }
            })

            return {
                ...state,
                allIds: [...state.allIds, fileList.map(file => file.id)],
                byIds: {
                    ...state.byIds,
                    ...filesByIds
                }
            }
        }

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
                        newBlankEntry: true
                    },
                },
                selectedId: id,
                newFileEntry: true,
                enteringName: true
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
                },
                enteringName: true
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
                newFileEntry: false,
                enteringName: false
            }

        }
        case types.TOGGLE_SELECT_FILE: {
            const { id } = action.payload;
            const temp = (id === state.selectedId && state.revSelectedId !== null ? state.prevSelectedId : state.selectedId) // If selected Again keep previous prevId

            return {
                ...state,
                selectedId: id,
                editingCode: true,
                prevSelectedId: temp
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
                        editingCode: false,
                        newBlankEntry: false
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
                selectedId: state.selectedId !== id ? state.selectedId : state.prevSelectedId
            }
        }
        case types.DELETE_ALL_FILES: {
            return initialState;
        }
        default:
            return state

        
    }
    
}