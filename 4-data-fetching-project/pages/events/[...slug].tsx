import ErrorAlert from '../../components/events/ErrorAlert';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';


export default function FilteredEventsPage({ invalidParameters, events, year, month }) {

    if (invalidParameters)
        return <ErrorAlert message="Invalid parameters" link="/events"/>

    if (!events || events.length === 0)
        return <ErrorAlert message="No events found for the chosen filters" link="/events"/>

    return <>
        <ResultsTitle date={new Date(year, month)}/>
        <EventList events={events}/>
    </>
}

export async function getServerSideProps(context) {
    const filterData = context.params.slug;

    if (!filterData) return <p className="center">Loading...</p>

    const year = +filterData[0];
    const month = +filterData[1];

    if (isNaN(year)
        || isNaN(month)
        || year < 2020
        || year > 2022
        || month < 1
        || month > 12
    )
        return {
            props: { invalidParameters: true }
        }


    return fetch('https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/events.json')
        .then(response => response.json())
        .then(data => {
            const events = [];
            for (const key in data)
                events.push({ ...data[key], id: key });

            return {
                props: {
                    year,
                    month,
                    events: events.filter((event) => {
                        const eventDate = new Date(event.date);
                        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
                    })
                },
            }
        });
}
