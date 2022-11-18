import ErrorAlert from '../../components/events/ErrorAlert';
import EventContent from '../../components/events/EventContent';
import EventLogistics from '../../components/events/EventLogistics';
import EventSummary from '../../components/events/EventSummary';

export default function EventPage({ event }) {

    if (!event) return <ErrorAlert link="/events" message="No event with such ID"/>

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


export async function getServerSideProps(context) {
    const { eventId } = context.params;

    return fetch(`https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/events/${eventId}.json`)
        .then(response => response.json())
        .then(data => ({
            props: {
                event: {
                    ...data,
                    id: eventId,
                }
            },
        }));
}
