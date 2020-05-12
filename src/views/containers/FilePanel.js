import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux'; 
import { 
    addNewFile,
    addDroppedFiles,
    selectFile,
    startFileNameChange, 
    deleteFile, changeFileName,
    deleteAll, 
    changeFileSrc,
    setNameNewFile
 } from '../../redux/actions/files';


const FilePanel = (props) => {
    let dragCounter = 0
    const [ dragOver, setDragOver ] = useState(false);
    const dropRef = createRef();
    const { addNewFile, addDroppedFiles, deleteAll } = props;
    const createFileHandler = (e) => {
        e.preventDefault();
        addNewFile();
    }
    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
            setDragOver(true)
    }

    const handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter--
        if (dragCounter == 0){
            setDragOver(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragOver(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){
            let promises = []
            const fileList = []
            
            for(var i=0; i < e.dataTransfer.files.length; i++){
                const file = e.dataTransfer.files[i]
                if(file.name.includes('.java')){
                    let filePromise = new Promise(resolve => {
                        let reader = new FileReader()
                        reader.onload = function(e){
                            //fileList.push({'name' : file.name, 'src': e.target.result})
                            resolve({name: file.name, src: e.target.result})
                        }
                        reader.readAsText(file)

                    })
                    promises.push(filePromise)
                }

            }
            Promise.all(promises).then(files => {
                console.log(files)
                addDroppedFiles(files)
                e.dataTransfer.clearData()
                dragCounter = 0
            })


        }
    }

    useEffect(() => {
        let ul = dropRef.current;
        ul.addEventListener('dragenter', handleDragIn)
        ul.addEventListener('dragleave', handleDragOut)
        ul.addEventListener('dragover', handleDrag)
        ul.addEventListener('drop', handleDrop)

        return () => {
            ul.removeEventListener('dragenter', handleDragIn)
            ul.removeEventListener('dragleave', handleDragOut)
            ul.removeEventListener('dragover', handleDrag)
            ul.removeEventListener('drop', handleDrop)
        }

    }, [])

    return (
        <ul className={dragOver ? "file-list dragOver" :"file-list"}
            ref={dropRef}
        >
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
    addDroppedFiles,
    deleteFile,
    deleteAll,
    selectFile,
    changeFileName,
    changeFileSrc,
    setNameNewFile,
    startFileNameChange
}

export default connect(mapStateToProps, mapDispatchToProps)(FilePanel);
