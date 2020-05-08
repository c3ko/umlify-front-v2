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

    const { addNewFile, deleteAll } = props;
    const createFileHandler = (e) => {
        e.preventDefault();
        addNewFile();
    }
    return (
        <ul className="file-list">
            <span className="file-panel-toolbar">                
                <button onClick={createFileHandler}><i className="fas fa-plus"></i></button>         
                <button onClick={(e) => deleteAll()}><i className="fas fa-trash"></i></button>
            </span>
            {props.files.map((file, index) => file.editingName ? <ModFileListItem key={file.id} file={file} {...props}/> :  <FileListItem key={file.id} file={file} {...props}/> )}
            { props.files.newFileEntry ? <ModFileListItem {...props}/> : <></>}
            
        </ul>
    )
}

const FileListItem = (props) => {

    let timer = 0;
    let delay = 200;
    let prevent = false;
    const { file, enteringName, selectedId, selectFile, deleteFile, startFileNameChange } = props;

    const handleKeydown = (e) => {
        // Enter is pressed
        if (e.keyCode === 13){
            e.target.blur();
            console.log(e.target.value);
            changeFileName(file.id, e.target.value);
        }
    }

    return (
        <span className={selectedId === file.id ? "file-list-item selected": "file-list-item"}>
            <i className="fas fa-file" />
            <input
                className={selectedId === file.id ? "file-list-item-input selected": "file-list-item-input"}
                name = { file.id }
                onMouseDown={e => e.preventDefault()}
                onClick={(e) => {
                    e.preventDefault();
                    timer = setTimeout(() => {
                        if (!(prevent) && !(enteringName)){
                            console.log('Single Click') // Select File
                            selectFile(file.id);
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
                onChange={e => e.preventDefault()} 
                onKeyDown={handleKeydown}

            />
            <button className="delete-file-button" onClick={(e) => deleteFile(file.id)}><i className="fas fa-times-circle"></i></button>
        </span>
    )
}

const ModFileListItem = (props) => {
    
    const { file, changeFileName } = props;
    const [ name, setName ] = useState((file ? file.name : ''));
    const fileItemRef = createRef();

    useEffect(() => {
        
        // Listen for click outside input
        fileItemRef.current.focus();  
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
        <span className="file-list-item">
            <i className="fas fa-file" />
            <input
                className="file-list-item-input"
                ref={fileItemRef}
                name = { file.id }
                defaultValue={ name } type="text" 
                onKeyDown={handleKeydown}
                onBlur={(e) => {
                    selectFile(file.id)
                    changeFileName(file.id, e.target.value)

                }}
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
        newFileEntry: state.files.newFileEntry,
        enteringName: state.files.enteringName
    }
}

const mapDispatchToProps =  { 
    addNewFile,
    deleteFile,
    deleteAll,
    selectFile,
    changeFileName,
    changeFileSrc,
    setNameNewFile,
    startFileNameChange
}

export default connect(mapStateToProps, mapDispatchToProps)(FilePanel);
