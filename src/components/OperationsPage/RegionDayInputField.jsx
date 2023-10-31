import React from "react"
import './RegionDayInputField.css'

const RegionDayInputField = React.memo(({ disabled, index, value, onChange, setFocusedRegionDayInput, focusedRegionDayInput }) => {
    return (
        <input
            disabled={disabled}
            placeholder='Gün sayı'
            className='regionDayInput'
            autoFocus={focusedRegionDayInput === index}
            type="text"
            required
            value={value}
            onFocus={() => {
                setFocusedRegionDayInput(index)
            }}
            onChange={(e) => onChange(index, e.target.value)}
        />
    )
})

export default RegionDayInputField;