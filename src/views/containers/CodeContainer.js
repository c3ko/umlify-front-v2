import React, { useState, useEffect } from 'react';
import FilePanelList, { FilePanelToolbar } from './FilePanel';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-palenight.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/neat.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/mode/clike/clike.js'


import { Controlled as CodeMirror} from 'react-codemirror2';
import '../../styles/code_pane.scss';
const filenameList = ['File1.java', 'File2.java', 'File3.java'];

const options = {
    mode: 'text/x-java',
    theme: 'material-palenight',
    lineNumbers: true,
    matchBrackets: true,
    scrollBarStyle: "simple"

}

function CodeContainer() {
    
    useEffect(() => {
        // Check if cookies stored previous Files, if not set displayIntro to true
        setDisplayIntro(true);
        setTitle('');
    }, []);

    const fileDropHandler = (e) => {
        e.preventDefault();
        if (e.dataTransfer.items){
            
        }
    }

    const [ newFileStatus, setNewFileStatus ] = useState('hidden');
    const setFocusAndGetFileName = () => {
        
    }

    const addNewFile = (e) => {
        e.preventDefault();
        setDisplayIntro(false);
        setNewFileStatus('entry');


    };
    const removeFiles = (e) => {
        e.preventDefault();

    };

    
    const [ title, setTitle ] = useState('');
    const [ displayIntro, setDisplayIntro ] = useState(null);
    const [ currentCode, setCurrentCode] = useState('');
    


    return (
        <div className="code-panel-container">
            <div className="file-panel-container">
                <p className="file-panel-title">FILES</p>
                <FilePanelToolbar 
                    addNewFileHandler={addNewFile}
                    removeFiles={removeFiles}
                />
                <FilePanelList 
                    newFileStatus={newFileStatus}
                />
            </div>
            
            <div className="code-entry-container">
            <p className="current-file-title">{title}</p>
                {
                    displayIntro ?
                    <div className="intro CodeMirror">
                        
                    </div>
                    :
                    <CodeMirror
                        className="codemirror"
                        value={currentCode}
                        options={options}
                        onBeforeChange={(editor, data, currentCode) => {
                            setCurrentCode(currentCode);
                        }}
                        
                        onChange={(editor, value) => {
                            console.log('controlled', {value});
                        }}
                    />
                }
            </div>
            
        </div>
    )
}

export default CodeContainer;
