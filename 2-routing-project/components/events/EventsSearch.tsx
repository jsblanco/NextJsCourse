import { useRef } from 'react';
import { months } from '../../global-data';
import Button from '../ui/Button';
import classes from './EventsSearch.module.css'

export default function EventsSearch({ onSearch }: { onSearch: (year: string, month: string) => void }) {
    const yearInputRef = useRef<HTMLSelectElement>();
    const monthInputRef = useRef<HTMLSelectElement>();

    const onSubmit = (event: Event) => {
        event.preventDefault();
        const selectedYear = yearInputRef.current.value;
        const selectedMonth = monthInputRef.current.value;

        onSearch(selectedYear, selectedMonth)
    }

    return (
        <form className={classes.form}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="year">Year</label>
                    <select id="year" ref={yearInputRef}>
                        <option value={2021}>2021</option>
                        <option value={2022}>2022</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="month">Month</label>
                    <select id="month" ref={monthInputRef}>
                        {months.map((month, index) =>
                            <option value={index + 1}>{month}</option>
                        )}
                    </select>
                </div>
            </div>
            <Button onClick={onSubmit}>Find events</Button>
        </form>
    )
}
