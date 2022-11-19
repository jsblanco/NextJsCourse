import AddressIcon from '../../../../../../Downloads/icons/address-icon';
import DateIcon from '../../../../../../Downloads/icons/date-icon';
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
                <img src={`/${image}`} alt={imageAlt}/>
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
