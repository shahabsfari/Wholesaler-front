import React from 'react'
import './SwitchButton2.css'
export default function SwitchButtonv2({activeButtonHandler , checked , name}) {

    return (
        <label className="toggle-switch" >
            <input checked={checked} type="checkbox" onChange={() => activeButtonHandler(name)} />
            <div className="toggle-switch-background">
                <div className="toggle-switch-handle"></div>
            </div>
        </label>
    )
}
