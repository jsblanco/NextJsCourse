import EventTarget from 'next/dist/compiled/@edge-runtime/primitives/events';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ErrorAlert from '../../components/events/ErrorAlert';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import { apiUrl } from '../../components/helpers/api-util';
import useSWR from 'swr';
import { EventData } from '../../components/helpers/util';


export default function FilteredEventsPage(props) {

    // const { invalidParameters, events, year, month } = props;
    const [events, setEvents] = useState<EventData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const filterData = router.query.slug;
    const { data, error } = useSWR(apiUrl, (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        setIsLoading(true);
        if (data) {
            const events = [];
            for (const key in data)
                events.push({ ...data[key], id: key });
            setEvents(events);
        }
        setIsLoading(false);

    }, [data]);

    if (isLoading) return <p>Loading...</p>

    if (error || !filterData)
        return <ErrorAlert link={'/events'} message={'Something went wrong'} />

    const year = +filterData[0];
    const month = +filterData[1];

    // if (invalidParameters)
    if (isNaN(year) || isNaN(month) || year < 2020 || year > 2022 || month < 1 || month > 12)
        return <ErrorAlert message="Invalid parameters" link="/events"/>

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);

        return eventDate.getFullYear() === year
            && eventDate.getMonth() === (month - 1);
    })

    if (!filteredEvents || filteredEvents.length === 0)
    return <ErrorAlert message="No events found for the chosen filters" link="/events"/>

    return <>
        <ResultsTitle date={new Date(year, month)}/>
        <EventList events={filteredEvents}/>
    </>
}

// export async function getServerSideProps(context) {
//     const filterData = context.params.slug;
//
//     if (!filterData) return { notFound: true }
//
//     const year = +filterData[0];
//     const month = +filterData[1];
//
//     if (isNaN(year) || isNaN(month) || year < 2020 || year > 2022 || month < 1 || month > 12)
//         return { props: { invalidParameters: true } }
//
//     return {
//         props: {
//             year,
//             month,
//             events: await getFilteredEvents(year, month),
//         },
//     }

// return fetch('https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/events.json')
//     .then(response => response.json())
//     .then(data => {
//         const events = [];
//         for (const key in data)
//             events.push({ ...data[key], id: key });
//
//         return {
//             props: {
//                 year,
//                 month,
//                 events: events.filter((event) => {
//                     const eventDate = new Date(event.date);
//                     return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
//                 })
//             },
//         }
//     });
// }
