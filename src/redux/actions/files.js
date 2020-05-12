import * as types from './types';


/*
    file will be object in form of { id: , name: "", src: ""} containing name of file and the source code of the file
*/
let id = 1;

export const addDroppedFiles = (files) => {
    const fileList = []
    files.map(file => {
        fileList.push({id: id++, name: file.name, src: file.src});
    })
    console.log("AddDroppedFile list length", files.length)
    console.log("AddDroppedFIle", fileList)
    return {
        type: types.ADD_DROPPED_FILES,
        payload: {
            fileList
        }
    }

}
export const addNewFile = ()  => ({
    type: types.ADD_NEW_FILE,
    payload :{
        id: id++
    }
});

export const setNameNewFile = (filename) => ({
    type: types.SET_NAME_NEW_FILE,
    payload : {
        name: filename
    }
})

export const selectFile = (id) => ({
    type: types.TOGGLE_SELECT_FILE,
    payload : {
        id
    }
    
})
export const startFileNameChange = (id) => ({
    type: types.START_MODIFY_FILE_NAME,
    payload: {
        id
    }
})

export const changeFileName = (id, name) => ({
    type: types.MODIFY_FILE_NAME,
    payload: {
        id,
        name
    }
});

export const changeFileSrc = (id, src) => ({
    type: types.MODIFY_FILE_SRC,
    payload: {
        id,
        src
    }

})

export const deleteFile = (id) => ({
    type: types.DELETE_FILE,
    payload: {
        id
    }
})

export const deleteAll = () => ({
    type: types.DELETE_ALL_FILES,
})