import React, { useState, useEffect, createRef } from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import FilePanel from './FilePanel';
import { connect } from 'react-redux';
import '../../styles/code_pane.scss';


function CodeContainer() {
    
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



    return (
        <>
            <AceEditor
                ref={codeRef}
                mode="javascript"
                theme="monokai"
                name="ace-editor"
                onChange={(value) => {
                    setCurrentCode(value);
                }}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={currentCode}
                setOptions={{
                    showLineNumbers: true,                
                    tabSize: 4,
                }}
                />
                <FilePanel />
            </>
            

        );
    }

const mapStateToProps = (state) => {
    return {
        files: state.files
    }
}

const mapDispatchToProps = () => {

}

export default connect(mapStateToProps, mapDispatchToProps)(CodeContainer);
