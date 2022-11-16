import { useRouter } from 'next/router';
import ErrorAlert from '../../components/events/ErrorAlert';
import EventContent from '../../components/events/EventContent';
import EventLogistics from '../../components/events/EventLogistics';
import EventSummary from '../../components/events/EventSummary';
import { getEventById } from '../../global-data';

export default function EventPage() {
    const router = useRouter();
    const event = getEventById(router.query.eventId)

    if (!event) return <>
        <ErrorAlert  link="/events" message="No event with such ID"/>
    </>

    return (
        <>
            <EventSummary title={event.title}/>
            <EventLogistics event={event} imageAlt={event.title}/>
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    )
}
