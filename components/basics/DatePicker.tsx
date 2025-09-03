import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface CustomDatePickerProps {
    id?: string;
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
    [key: string]: any; // for ...rest
}

const CustomDatePicker = ({
    id,
    selectedDate,
    onDateChange,
    ...rest
}: CustomDatePickerProps) => {
    return (
        <DatePicker
            className="w-full p-2 border border-gray-300 rounded"
            {...rest}
            id={id}
            selected={selectedDate}
            onChange={(date) => onDateChange(date)}
            dateFormat="yyyy-MM-dd"
        />
    );
};

export default CustomDatePicker;
