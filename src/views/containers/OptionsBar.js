import React, {} from 'react';
import '../../styles/options.scss';
import { getUML } from '../../redux/actions/fetch';
import { connect } from 'react-redux';
import { changeUMLColours } from '../../util/umls';

function OptionsBar(props) {

    const { files, getUML, umlInfo } = props;
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Files:", files)
        const filesList =  Object.values(files.byIds).map(file => file.src)
        console.log("filesList", filesList)
        getUML(filesList, 'svgs');
    }

    const changeColoursHandler = (e) => {
        e.preventDefault()
        changeUMLColours('#FFFFF','#00000')
    }

    const downloadUMLHandler = (e) => {
        e.preventDefault();
        if (umlInfo.uml){
            var downloadLink = document.createElement('a')
            var svgBlob = new Blob([umlInfo.uml], {type:"image/svg+xml;charset=utf-8"})
            var svgUrl = URL.createObjectURL(svgBlob)
            downloadLink.href = svgUrl
            downloadLink.setAttribute('download', 'uml')
            e.currentTarget.appendChild(downloadLink)
            downloadLink.click()
            e.currentTarget.removeChild(downloadLink)
        }
    }
    return (
        <ul className="options-bar-container">
            <li>
                <h1>UMLIFY</h1>
            </li>
            <li>
                <span className="button-group">
                    <button onClick={submitHandler} className="reset-button button solid">SUBMIT</button>
                    <button onClick={downloadUMLHandler} disabled={umlInfo.uml === null} className="download-button button outline">DOWNLOAD</button>   
                </span>

            </li>
        </ul>
    )
}

const mapStateToProps = (state) => ({
    files: state.files,
    umlInfo: state.uml
})
export default connect(mapStateToProps, { getUML } )(OptionsBar);
