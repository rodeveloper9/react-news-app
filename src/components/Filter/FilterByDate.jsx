import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const FilterByDate = (props) => {
    const {dateValue, onCalenderChange} = props;
    return (
        <div className='filterWrap_item'>
            {/* <p className="filterWrap_item_heading">By Date</p> */}
            <DatePicker
                onChange={onCalenderChange}
                value={dateValue}
                maxDate={new Date()}
                className={'filterWrap_item_byDate'}
            />
        </div>
    )
}

export default FilterByDate;

