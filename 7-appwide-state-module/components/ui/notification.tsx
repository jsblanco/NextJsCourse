import { useContext } from 'react';
import classes from './notification.module.css';
import NotificationContext, {
	NotificationStatus,
} from '../../store/notification-context';

export default function Notification(props) {
	const { hideNotification } = useContext(NotificationContext);

	const { title, message, status } = props;

	let statusClasses = '';

	if (status === NotificationStatus.SUCCESS) {
		statusClasses = classes.success;
	}

	if (status === NotificationStatus.ERROR) {
		statusClasses = classes.error;
	}

	if (status === NotificationStatus.PENDING) {
		statusClasses = classes.pending;
	}

	const activeClasses = `${classes.notification} ${statusClasses}`;

	return (
		<div className={activeClasses} onClick={hideNotification}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
}
