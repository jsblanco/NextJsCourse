import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../global-data';

export default function Events() {

    const router = useRouter();
    const events = getAllEvents();

    const findEventsHandler = (year: string, month: string) => {
        router.push(`/events/${year}/${month}`).then();
    }

    return (
        <div>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList events={events}/>
        </div>
    )
}
