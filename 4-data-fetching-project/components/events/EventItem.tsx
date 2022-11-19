import Image from 'next/image';
import { EventData } from '../helpers/util';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import DateIcon from '../icons/DateIcon';
import Button from '../ui/Button';
import classes from './EventItem.module.css'

export default function EventItem({ event }: { event: EventData }) {

    const readableDate = new Date(event.date).toLocaleDateString('es-Es', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedAddress = event.location.replace(', ', '\n')

    return (
        <li className={classes.item}>
            <Image src={'/' + event.image} alt={event.title} width={300} height={200}/>
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
