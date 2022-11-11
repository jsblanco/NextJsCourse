import { EventData } from '../../dummy-data';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';
import Button from '../ui/Button';
import classes from './event-item.module.css'

export default function EventItem({ event }: { event: EventData }) {

    const readableDate = new Date(event.date).toLocaleDateString('es-Es', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedAddress = event.location.replace(', ', '\n')

    return (
        <li className={classes.item}>
            <img src={'/' + event.image} alt={event.title}/>
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{event.title}</h2>
                    <div className={classes.date}>
                        <DateIcon/>
                        <time>{readableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon/>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={`/events/${event.id}`}>
                        <span>Explore event </span>
                        <span className={classes.icon}><ArrowRightIcon/></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}
