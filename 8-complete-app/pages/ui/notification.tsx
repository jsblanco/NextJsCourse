import { createPortal } from 'react-dom'
import { RequestStatus } from '../../components/helper/enums';
import classes from './notification.module.css';


interface NotificationProps {
    title: string;
    message: string;
    status: RequestStatus;
}

export default function Notification({ title, message, status }: NotificationProps) {

    let statusClasses = '';

    if (status === RequestStatus.success) statusClasses = classes.success;
    else if (status === RequestStatus.error) statusClasses = classes.error;

    return createPortal(
        (
            <div className={`${classes.notification} ${statusClasses}`}>
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
        ), document.getElementById('notifications')
    );
}
