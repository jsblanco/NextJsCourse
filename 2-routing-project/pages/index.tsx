import Link from 'next/link';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../global-data';

export default function Home() {

    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <h1>Welcome home!</h1>
            <Link href="/events">Events</Link>
            <EventList events={featuredEvents}/>
        </div>
    )
}
