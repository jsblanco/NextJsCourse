import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext, {
	NotificationStatus,
} from '../../store/notification-context';

function NewsletterRegistration() {
	const emailRef = useRef<HTMLInputElement>();
	const { showNotification } = useContext(NotificationContext);

	function registrationHandler(event) {
		event.preventDefault();
		const email = emailRef.current.value;
		showNotification({
			title: 'Signing up',
			message:
				'Please wait while we verify we could register you to our newsletter...',
			status: NotificationStatus.PENDING,
		});

		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				if (response.ok) return response.json();

                response.json().then(data => {throw new Error(data.message)} )
			})
			.then((data) =>
				showNotification({
					title: 'Success!!',
					message: 'Welcome to a world of excitement! Have fun!!',
					status: NotificationStatus.SUCCESS,
				})
			)
			.catch((error) =>
				showNotification({
					title: 'Something went wrong',
					message: `We were unable to register you to our newsletter, please try again later. ${
						error.message && 'Error message: ' + error.message
					}`,
					status: NotificationStatus.ERROR,
				})
			);
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						id='email'
						type='email'
						ref={emailRef}
						aria-label='Your email'
						placeholder='Your email'
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
