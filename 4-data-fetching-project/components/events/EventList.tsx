import { EventData } from '../../global-data';
import EventItem from './EventItem';
import classes from './EventList.module.css'

export default function EventList({ events }: { events: EventData[] }) {
    return <ul className={classes.list}>
        {events.map((event) => <EventItem key={event.id} event={event}/>)}
    </ul>
}
