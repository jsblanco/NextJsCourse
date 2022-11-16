import { useRouter } from 'next/router';
import ErrorAlert from '../../components/events/ErrorAlert';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import { getFilteredEvents, months } from '../../global-data';

export default function FilteredEventsPage() {

    const router = useRouter();
    const filterData = router.query.slug;

    if (!filterData) return <p className="center">Loading...</p>

    const year = +filterData[0];
    const month = +filterData[1];

    if (isNaN(year)
        || isNaN(month)
        || year < 2020
        || year > 2022
        || month < 1
        || month > 12
    ) {
        return <ErrorAlert message="Invalid parameters" link="/events"/>
    }

    const filteredEvents = getFilteredEvents({
        year,
        month,
    })

    if (!filteredEvents || filteredEvents.length === 0) {
        return <ErrorAlert message="No events found for the chosen filters" link="/events"/>
    }

    return (
        <>
            <ResultsTitle date={new Date(year, month)}/>
            <EventList events={filteredEvents}/>
        </>
    )
}
