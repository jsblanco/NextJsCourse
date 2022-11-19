import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../components/helpers/api-util';
import Head from 'next/head'

export default function Events({ events }) {

    const router = useRouter();

    const findEventsHandler = (year: string, month: string) =>
        router.push(`/events/${year}/${month}`).then();

    return (
        <>
            <Head>
               <title>All Events</title>
                <meta name="description" content="Browse through all events, both featured and not"/>
            </Head>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList events={events}/>
        </>
    )
}

export const getStaticProps = async () => ({
    revalidate: 360,
    props: { events: await getAllEvents() },
})

// export async function getStaticProps() {
// return fetch('https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/events.json')
//     .then(response => response.json())
//     .then(data => {
//         const events = [];
//         for (const key in data)
//             events.push({ ...data[key], id: key });
//         return {
//             revalidate: 3600,
//             props: { events },
//         }
//     });
// }
