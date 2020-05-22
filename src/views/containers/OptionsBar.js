import React, {} from 'react';
import '../../styles/options.scss';
import { getUML } from '../../redux/actions/fetch';
import { connect } from 'react-redux';
import { changeUMLColours } from '../../util/umls';

function OptionsBar(props) {

    const { files, getUML } = props;
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

    return (
        <ul className="options-bar-container">
            <li>
                <h1>UMLIFY</h1>
            </li>
            <li>
                <span className="button-group">
                    <button onClick={submitHandler} className="reset-button button solid">SUBMIT</button>
                    <button onClick={changeColoursHandler} className="download-button button outline">DOWNLOAD</button>   
                </span>

            </li>
        </ul>
    )
}

const mapStateToProps = (state) => ({
    files: state.files
})
export default connect(mapStateToProps, { getUML } )(OptionsBar);
