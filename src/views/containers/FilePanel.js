import React, { useState, useEffect, createRef } from 'react';

export function FilePanelToolbar({ addNewFileHandler }) {
    
    return (
        <span className="file-panel-toolbar">

            <button><i className="fas fa-check-square"></i></button>
            <div className="add-button-group">
                <button onClick={addNewFileHandler}>
                    <i className="fas fa-plus"></i>
                </button>
                <div className="speech-bubble">
                    <p>Click here to add new File</p>
                </div>
            </div>

            <button><i className="fas fa-trash"></i></button>
            
        </span>
    )
}



function FilePanelEntryItem(modifyFileHandler){
    const newItemRef = createRef();

    const handleOutsideClick = (e) => {
        e.preventDefault();
        // Click was made outside
        if (!newItemRef.current.contains(e.target)){
            console.log('Clicked Outside');
            //modifyFileHandler();
        }
    }
    
    useEffect(() => {
        newItemRef.current.focus();

        // Listen for click outside input
        document.addEventListener('mousedown', handleOutsideClick, false);    

        // Stop listening on unmount
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick, false); 
        }
    }, [])


    const keyHandler = (e) => {
        if (e.key === "Enter"){
            modifyFileHandler(e.value);
        }
    }

    return (
        <li className="file-panel-item">
            <input 
                className="filename-input" type="text"
                onKeyDown={keyHandler}
                ref={newItemRef} 
            />          
        </li>
    )

}

function FilePanelListItem({ filename, newFile, newFileHandler }) {
    const [ modifyName, setModifyName] = useState(false);


    const handleDBClick = (e) => {
        e.preventDefault();
        setModifyName(true);

    }


    if (newFile || modifyName) {
        return (
            <FilePanelEntryItem />
        )

    }

    else {
        return (
            <li className="file-panel-item" >
                <span onDoubleClick={handleDBClick}>
                    <input className="file-item-checkbox" type="checkbox" />
                    <i className="fas fa-file"></i>
                    <label>
                        { filename }
                    </label>
                </span>
            </li>
        )
    }

}


function FilePanel({ filenameList, newFileStatus }) {
    
    return (
        <ul className="file-panel-list">
            { filenameList != null ? filenameList.map(filename => <FilePanelListItem newFile={newFileStatus === "entry"} filename={filename} />)  : <> </>}
            <FilePanelListItem filename="Example" />
        </ul>
        
    )
}

export default FilePanel;
