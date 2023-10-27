import {DayPicker} from "react-day-picker"
import './DatePicker.css'
import {az} from 'date-fns/locale'

const DatePicker = ({startDate, setStartDate, displayedMonth, setDisplayedMonth}) => {
    return (
        <DayPicker
            mode="single"
            required
            month={displayedMonth}
            onMonthChange={setDisplayedMonth}
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