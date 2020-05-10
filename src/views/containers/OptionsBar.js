import React, {} from 'react';
import '../../styles/options.scss';
function OptionsBar() {
    return (
        <ul className="options-bar-container">
            <li>
                <h1>UMLIFY</h1>
            </li>
            <li>
                <span className="button-group">
                    <button className="reset-button button solid">SUBMIT</button>
                    <button className="submit-button button outline">DOWNLOAD</button>   
                </span>

            </li>

        </ul>
    )
}

export default OptionsBar;
