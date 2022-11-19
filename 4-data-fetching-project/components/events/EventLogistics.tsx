import Image from 'next/image';
import LogisticsItem from './LogisticsItem';
import classes from './EventLogistics.module.css';
import { EventData } from '../helpers/util';


function EventLogistics({ event, imageAlt }: { event: EventData, imageAlt: string}) {
    const { date, location, image } = event;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const locationText = location.replace(', ', '\n');

    return (
        <section className={classes.logistics}>
            <div className={classes.image}>
                <Image src={`/${image}`} alt={imageAlt} width={400} height={400}/>
            </div>
            <ul className={classes.list}>
                <LogisticsItem>
                    <time>{humanReadableDate}</time>
                </LogisticsItem>
                <LogisticsItem>
                    <address>{locationText}</address>
                </LogisticsItem>
            </ul>
        </section>
    );
}

export default EventLogistics;
