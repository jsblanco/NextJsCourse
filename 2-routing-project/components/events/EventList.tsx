import { EventData } from '../../dummy-data';
import EventItem from './EventItem';
import classes from './event-list.module.css'

export default function EventList({ events }: { events: EventData[] }) {
    return <ul className={classes.list}>
        {events.map((event, index) => <EventItem key={index} event={event}/>)}
    </ul>
}
