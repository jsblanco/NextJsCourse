import Link from 'next/link';

export default function Events() {
    return (
        <div>
            <h1>Welcome to the Events page!</h1>
            <ul>
                {new Array(5).fill("").map((_, i) => (
                    <li key={i}>
                        <Link href={{
                            pathname: '/events/[eventId]',
                            query: { eventId: i },
                        }}>{'Event ' + (i+1)}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
