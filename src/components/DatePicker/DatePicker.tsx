import React from 'react';
import Input from "../UI/Input/Input";
import IconCalendar from "../UI/Icon/IconCalendar";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

const datePickerInputStyles = {
    display: 'block',
    width: '100%',
    padding: '7px 14px',
    border: '1px solid #3B4253',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    lineHeight: '24px',
    color: '#E0E0E0',
}

interface DatePickerProps extends Omit<ReactDatePickerProps, "value"> {
    onChange: () => void;
    selected: Date;
    onBlur: () => void;
}

function DatePicker({ onChange, onBlur, selected, ...props }: DatePickerProps) {
    return (
        <ReactDatePicker
            onChange={onChange}
            onBlur={onBlur}
            selected={selected}
            dateFormat="dd.MM.yyyy HH:mm"
            showTimeInput
            customInput={
                <Input
                    icon={<IconCalendar/>}
                    label={"Дата и время окончания"}
                    placeholder={"Дата и время"}
                    style={datePickerInputStyles}
                />
            }
            {
                ...props
            }
        />
    );
}

export default DatePicker;