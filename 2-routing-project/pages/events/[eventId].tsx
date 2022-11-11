import { useRouter } from 'next/router';

export default function EventPage() {
    const router = useRouter();
    return (
        <div>
            <h1>Welcome to the page of event #{router.query.eventId}</h1>

        </div>
    )
}
