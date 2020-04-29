import React, { useState, useEffect, createRef } from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import FilePanel from './FilePanel';
import { connect } from 'react-redux';
import '../../styles/code_pane.scss';

import { changeFileSrc } from '../../redux/actions/files';

function CodeContainer(props) {
    
    const { selectedId, files, changeFileSrc } = props;
    const codeRef = createRef();
    const [ currentCode, setCurrentCode] = useState('');
    const [ codeFocus, setCodeFocus] = useState(false);
    
    const handleOutsideClick = (e) => {
        if(e.keyCode === 27){
            //setCodeFocus(false);
            if (codeRef.current && !codeFocus){
                
                codeRef.current.editor.blur();

            } else if (codeRef.current && codeFocus){
                codeRef.current.editor.focus();
            }
            setCodeFocus(!codeFocus)
            console.log(codeFocus)
            
        }
    }
    useEffect(() => {

        // Listen for click outside input
        document.addEventListener('keydown', handleOutsideClick, false);    

        // Stop listening on unmount
        return () => {
            document.removeEventListener('keydown', handleOutsideClick, false); 
        }
    },[])

    const file = files.byIds[selectedId];
    return (
        <div className="code-panel-container">
            <FilePanel />
            <div className="code-entry" >
                <AceEditor
                    ref={codeRef}
                    mode="javascript"
                    theme="monokai"
                    name="ace-editor"
                    onChange={(value) => {
                        changeFileSrc(file.id, value);
                    }}
                    width={"inherit"}
                    height={"100%"}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={file ? file.src : ''}
                    setOptions={{
                        showLineNumbers: true,                
                        tabSize: 4,
                    }}
                    /> 
            </div>  
          </div>
            

        );
    }

const mapStateToProps = (state) => {
    return {
        files: state.files,
        selectedId: state.files.selectedId,
    }
}

const mapDispatchToProps = {
    changeFileSrc
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeContainer);
