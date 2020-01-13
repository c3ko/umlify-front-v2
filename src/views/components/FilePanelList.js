import React from 'react';

export function FilePanelToolbar() {

    return (
        <span className="file-panel-toolbar">
            <button><i className="fas fa-check-square"></i></button>
            <button><i className="fas fa-plus"></i></button>
            <button><i className="fas fa-trash"></i></button>
            
        </span>
    )
}
function FilePanelListItem({ filename }) {
    return (
        <li className="file-panel-item">
            <span>
                <i className="fas fa-file"></i>
                { filename }
            </span>
        </li>
    )
}
function FilePanelList({ filenameList }) {
    return (
        <ul className="file-panel-list">
            { filenameList.map(filename => <FilePanelListItem filename={filename} />) }
        </ul>
        
    )
}

export default FilePanelList;
