import { createContext, useEffect, useState } from 'react';

export enum NotificationStatus {
	SUCCESS,
	ERROR,
	PENDING,
}

export interface NotificationData {
	title: string;
	message: string;
	status: NotificationStatus;
}

interface NotificationContextState {
	showNotification: (notification: NotificationData) => void;
	hideNotification: () => void;
	notification: NotificationData;
}
const NotificationContext = createContext<NotificationContextState>({
	notification: null,
	showNotification: (notification: NotificationData) => {},
	hideNotification: () => {},
});

export function NotificationContextProvider(props) {
	const [notification, setNotification] = useState<NotificationData>(null);

	useEffect(() => {
		if (notification && notification.status !== NotificationStatus.PENDING) {
			const timer = setTimeout(hideNotification, 3000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	const showNotification = (notification: NotificationData) => {
		setNotification(notification);
	};

	const hideNotification = () => setNotification(null);

	return (
		<NotificationContext.Provider
			value={{ notification, showNotification, hideNotification }}
		>
			{props.children}
		</NotificationContext.Provider>
	);
}

export default NotificationContext;
