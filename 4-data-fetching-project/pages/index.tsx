import EventList from '../components/events/EventList';

export default function Home({featuredEvents}) {

    return (
        <>
            <h1 className='center'>Welcome home!</h1>
            <EventList events={featuredEvents}/>
        </>
    )
}


export async function getStaticProps() {
    return fetch('https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/events.json')
        .then(response => response.json())
        .then(data => {
            const featuredEvents = [];
            for (const key in data)
                if (data[key].isFeatured)
                    featuredEvents.push({ ...data[key], id: key });
            return {
                revalidate: 3600,
                props: { featuredEvents },
            }
        });
}
