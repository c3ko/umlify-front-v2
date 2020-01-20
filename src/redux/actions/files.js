import * as types from './types';

let fileCount = 0;

/*
    file will be object in form of { name: "", src: ""} containing name of file and the source code of the file
*/
export const addFile = (file)  => ({
    type: types.ADD_NEW_FILE,
    id: fileCount++,
    file
});


export const changeFile = (id, file) => ({
    type: types.MODIFY_FILE,
    id,
    file
});

export const deleteFile = (id) => ({
    type: types.DELETE_FILE,
    id
})