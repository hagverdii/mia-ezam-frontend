import React from "react"
import './RegionDayInputField.css'

const RegionDayInputField = React.memo(({ index, value, onChange, setFocusedRegionDayInput, focusedRegionDayInput }) => {
    return (
        <input
            placeholder='Gün sayı'
            className='regionDayInput'
            autoFocus={focusedRegionDayInput === index}
            type="text"
            required
            value={value}
            onFocus={() => setFocusedRegionDayInput(index)}
            onChange={(e) => onChange(index, e.target.value)}
        />
    )
})

export default RegionDayInputField;