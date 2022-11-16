import { EventData } from '../../global-data';
import EventItem from './EventItem';
import classes from './EventList.module.css'

export default function EventList({ events }: { events: EventData[] }) {
    return <ul className={classes.list}>
        {events.map((event, index) => <EventItem key={index} event={event}/>)}
    </ul>
}
