import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { getMonth, getYear } from "date-fns";
import { useState, forwardRef, useEffect } from 'react';

import styles from '../styles/Userform.module.css';
import CalendarSvg from "../img/calender.png";

const years_range = Array.from({ length: new Date().getFullYear() - 1900 }, (_, i) => new Date().getFullYear() - i);
const months_range = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const Calendar = ({ setYear, setMonth, setDate }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const CustomCalendar = forwardRef(({ onClick }, ref) => (
        <button className={`${styles.CustomButton} ${selectedDate === null ? '' : 'custom-inputSelected'}`} onClick={onClick} ref={ref}>
            <img src={CalendarSvg} width={36} height={36} alt="Calendar" />
        </button>
    ));

    const onChangeCalendar = (date) => {
        if (date !== null) {
            setSelectedDate(date);
            setYear(date.getFullYear().toString());
            setMonth((date.getMonth() + 1).toString());
            setDate(date.getDate().toString());
        }
    };

    useEffect(() => {
        if (selectedDate !== null) {
            // Add any necessary side effects here
        }
    }, [selectedDate]);

    return (
        <div className={styles.CalendarContainer}>
            <DatePicker
                dateFormat='yyyy.MM.dd' // 날짜 형태
                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                minDate={new Date('1900-01-01')} // minDate 이전 날짜 선택 불가
                maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                selected={selectedDate}
                locale={ko}
                onChange={(date) => onChangeCalendar(date)}
                customInput={<CustomCalendar />}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                }) => (
                    <div
                        style={{
                            margin: 10,
                            display: "flex",
                            gap: '5px',
                            justifyContent: "left"
                        }}
                    >
                        <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
                            {years_range.map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>

                        <select
                            value={months_range[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                                changeMonth(months_range.indexOf(value))
                            }
                        >
                            {months_range.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            {"<"}
                        </button>
                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            {">"}
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default Calendar;
