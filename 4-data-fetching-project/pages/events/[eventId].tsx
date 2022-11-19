import ErrorAlert from '../../components/events/ErrorAlert';
import EventContent from '../../components/events/EventContent';
import EventLogistics from '../../components/events/EventLogistics';
import EventSummary from '../../components/events/EventSummary';
import { getEventById, getFeaturedEvents } from '../../components/helpers/api-util';

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

export const getStaticProps = async (context) => ({
    props: {
        event: await getEventById(context.params.eventId),
    },
})

export const getStaticPaths = async () => ({
    fallback: 'blocking',
    paths: (await getFeaturedEvents()).map(e => ({ params: { eventId: e.id } })),
})

// export async function getServerSideProps(context) {
//
//     return fetch(`https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/events/${eventId}.json`)
//         .then(response => response.json())
//         .then(data => ({
//             props: {
//                 event: {
//                     ...data,
//                     id: context.params.eventId,
//                 }
//             },
//         }));
// }
