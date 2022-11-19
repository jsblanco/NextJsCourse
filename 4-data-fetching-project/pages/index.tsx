import Head from 'next/head';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../components/helpers/api-util';

export default function Home({ featuredEvents }) {

    return (
        <>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content="Sample project for learning NextJS"/>
            </Head>
            <h1 className="center">Welcome home!</h1>
            <EventList events={featuredEvents}/>
        </>
    )
}


export const getStaticProps = async () => ({
    revalidate: 360,
    props: { featuredEvents: await getFeaturedEvents() },
})

// export async function getStaticProps() {
// return fetch('https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/events.json')
//     .then(response => response.json())
//     .then(data => {
//         const featuredEvents = [];
//         for (const key in data)
//             if (data[key].isFeatured)
//                 featuredEvents.push({ ...data[key], id: key });
//         return {
//             revalidate: 3600,
//             props: { featuredEvents },
//         }
//     });
// }
