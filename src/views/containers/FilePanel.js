import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux'; 
import { addNewFile, selectFile,
    startFileNameChange, 
    deleteFile, changeFileName,
    deleteAll, 
    changeFileSrc,
    setNameNewFile
 } from '../../redux/actions/files';


const FilePanel = (props) => {

    const { selectedId } = props;
    const createFileHandler = (e) => {
        e.preventDefault();
        props.addNewFile();

    }
    return (
        <ul className="file-list">
            <span className="file-panel-toolbar">                
                <button onClick={createFileHandler}><i className="fas fa-plus"></i></button>         
                <button onClick={(e) => deleteAll()}><i className="fas fa-trash"></i></button>
            </span>
            {props.files.map((file, index) => file.editingName ? <ModFileListItem file={file} {...props}/> :  <FileListItem file={file} {...props}/> )}
            { props.files.newFileEntry ? <ModFileListItem {...props}/> : <></>}
            
        </ul>
    )
}

const FileListItem = (props) => {

    let timer = 0;
    let delay = 200;
    let prevent = false;
  
    const { file, deleteFile, startFileNameChange } = props;

    const handleKeydown = (e) => {
        // Enter is pressed
        if (e.keyCode === 13){
            e.target.blur();
            console.log(e.target.value);
            changeFileName(file.id, e.target.value);
        }
    }

    return (
        <span className="file-list-item"
            onClick={(e) => {
                
            }}
        >
            <i className="fas fa-file" />
            <input
                className={"file-list-item-input" + props.selectedId === file.id ? " selected": ""}
                name = { file.id }
                onMouseDown={e => e.preventDefault()}
                onClick={(e) => {
                    e.preventDefault();
                    timer = setTimeout(() => {
                        if (!(prevent)){
                            console.log('Single Click') // Select File
                        }
                        prevent= false;
                    }, delay)
                }}
                onDoubleClick={(e) => {
                    e.preventDefault();
                    clearTimeout(timer);
                    prevent = true;
                    console.log('Double Click');
                    //e.target.focus();
                    startFileNameChange(file.id);
                    
                    
                }}
                value={ file.name } type="text" 
                onKeyDown={handleKeydown}

            />
            <button className="delete-file-button" onClick={(e) => deleteFile(file.id)}><i className="fas fa-times-circle"></i></button>
        </span>
    )
}

const ModFileListItem = (props) => {
    
    const { file, changeFileName } = props;
    const [ name, setName ] = useState((file ? file.name : null) || '');
    const fileRef = createRef();

    useEffect(() => {
        // Listen for click outside input
        fileRef.current.focus();  
        // Stop listening on unmount
        return () => {

        }

    }, []);

    const handleKeydown = (e) => {
        // Enter is pressed
        if (e.keyCode === 13){ 
            e.target.blur();
        }
    }

    return (
        <span className="file-list-item"
            onClick={(e) => {
                
            }}
        >
            <i className="fas fa-file" />
            <input
                className="file-list-item-input"
                ref={fileRef}
                name = { file ? file.id : null }
                onMouseDown={e => e.preventDefault()}     
                value={ name } type="text" 
                onKeyDown={handleKeydown}
                onBlur={(e) => changeFileName(file.id, e.target.value)}
                onChange={(e) => setName(e.value)}
            />
            <button className="delete-file-button name-entry"><i className="fas fa-times-circle"></i></button>
        </span>
    )
}


const mapStateToProps = (state) => {

    return {
        files: Object.values(state.files.byIds),
        selectedId: state.files.selectedId,
        newFileEntry: state.files.newFileEntry

    }
}

const mapDispatchToProps =  { 
    addNewFile,
    deleteFile,
    deleteAll,
    changeFileName,
    changeFileSrc,
    setNameNewFile,
    startFileNameChange
}

export default connect(mapStateToProps, mapDispatchToProps)(FilePanel);
