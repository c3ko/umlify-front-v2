import React, {  } from 'react';


function FileTab({ label, currentClicked,  handleClick}){
    
    return (
        <li>
            <a onClick={handleClick} className={"file-tab-item" + (currentClicked === label ? " active" : "") }>{ label }</a>
        </li>
    )
}
function FileTabList({ fileTabNameList }) {
    return (
        <ul className="file-tab-list">
            { fileTabNameList.map(fileTabName => <FileTab label={fileTabName} />) }
        </ul>
    )
}

export default FileTabList;
