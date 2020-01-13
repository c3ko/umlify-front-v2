import React, { useState } from 'react';
import FilePanelList, { FilePanelToolbar } from '../components/FilePanelList';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-palenight.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/neat.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/mode/clike/clike.js'


import { Controlled as CodeMirror} from 'react-codemirror2';
import '../../styles/code_pane.scss';
import FileTabList from '../components/FileTabList';
const filenameList = ['File1.java', 'File2.java', 'File3.java'];

const options = {
    mode: 'text/x-java',
    theme: 'material-palenight',
    lineNumbers: true,
    matchBrackets: true,
    scrollBarStyle: "simple"

}
function CodeContainer() {

    const [ currentCode, setCurrentCode] = useState('');

    return (
        <div className="code-panel-container">
            <div className="file-panel-container">
                <p className="file-panel-title">FILES</p>
                <FilePanelToolbar />
                <FilePanelList filenameList={ filenameList } />
            </div>
            <div className="code-entry-container">
                <p className="current-file-title">Title</p>
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
            </div>
        </div>
    )
}

export default CodeContainer;
