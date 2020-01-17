import React, { useState } from 'react';
import '../../styles/options.scss';
function OptionsBar() {
    return (
        <ul className="options-bar-container">
            <li>
                <span>
                    <input id="svg" type="radio" name="format" value="svg" />
                    <label for="svg">SVG</label>
                </span>
                <span>
                    <input id="png" type="radio" name="format" value="png" />
                    <label for="png">PNG</label>
                </span>
            </li>
            <li>
                <div className="">
                    <button>Submit</button>
                </div>
            </li>
            <li>

            </li>
        </ul>
    )
}

export default OptionsBar;
