import React, { useState } from 'react';
import '../../styles/options.scss';
function OptionsBar() {
    return (
        <ul className="options-bar-container">
            <li>
                Output Format:
                <span className="format-choice">
                    <input defaultChecked id="svg" type="radio" name="format" value="svg" />
                    <label htmlFor="svg">SVG</label>
                </span>
                <span className="format-choice">
                    <input id="png" type="radio" name="format" value="png" />
                    <label htmlFor="png">PNG</label>
                </span>
            </li>
            <li>
                <div className="">
                    <button className="submit-button button outline">Submit</button>
                </div>
            </li>

        </ul>
    )
}

export default OptionsBar;