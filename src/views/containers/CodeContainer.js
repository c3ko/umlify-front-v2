import React, { useEffect, createRef } from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import FilePanel from './FilePanel';
import { connect } from 'react-redux';
import '../../styles/code_pane.scss';

import { changeFileSrc } from '../../redux/actions/files';
var newFileId = -1;

function CodeContainer(props) {
    const { selectedId, files, changeFileSrc } = props;
    const file = files.byIds[selectedId];
    const codeRef = createRef();
    
    const handleKeydown = (e) => {
        if(e.keyCode === 27){
            if (codeRef.current && codeRef.current.editor.isFocused())
                codeRef.current.editor.blur()
        }
    }

    useEffect(() => {
        // Initial render where there are no files added
        if (files.byIds.length < 1 && codeRef.current)
            codeRef.current.editor.setReadOnly(true)
        
        document.addEventListener('keydown', handleKeydown, false)
        if (files.newFileEntry)
            newFileId = files.selectedId

        if (codeRef.current && !files.newFileEntry && (files.selectedId === newFileId) && !files.enteringName){
            //codeRef.current.editor.gotoLine(0,0,false);

            codeRef.current.editor.focus()
            newFileId = -1
        } else if (codeRef.current && codeRef.current.editor.isFocused()){
            codeRef.current.editor.blur()
        }

        return () => {
            document.removeEventListener('keydown', handleKeydown, false)
        }
    },[files.newFileEntry, files.selectedId])

    

    return (
        <div className="code-panel-container">
            <FilePanel />
            
            <div className="code-entry" >
                <AceEditor
                    on
                    ref={codeRef}
                    mode="java"
                    theme="monokai"
                    name="ace-editor"
                    onChange={(value) => {
                        changeFileSrc(file.id, file.newBlankEntry ? value.trimLeft() : value);
                    }}
                    width={"inherit"}
                    height={"100%"}
                    fontSize={14}
                    showGutter={true}
                    highlightActiveLine={true}
                    showPrintMargin={false}
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
