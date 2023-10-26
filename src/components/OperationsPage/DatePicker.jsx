import {DayPicker} from "react-day-picker"
import './DatePicker.css'
import {az} from 'date-fns/locale'

const DatePicker = ({startDate, setStartDate}) => {
    return (
        <DayPicker
            mode="single"
            required
            selected={startDate}
            onSelect={setStartDate}
            captionLayout="dropdown"
            locale={az}
            fromYear={2015}
            toYear={new Date().getFullYear()}
        />
    )
}

export default DatePicker