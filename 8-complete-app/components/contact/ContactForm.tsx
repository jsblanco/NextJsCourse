import { useEffect, useState } from 'react';
import Notification from '../../pages/ui/notification';
import { RequestStatus } from '../helper/enums';
import classes from './ContactForm.module.css'

export default function ContactForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (requestStatus === RequestStatus.pending || RequestStatus.error) {
            const timer = setTimeout(() => {
                setRequestStatus(null)
                setErrorMessage('')
            }, 3000)

            return clearTimeout.bind(null, timer)
        }
    }, [requestStatus])

    const sendMessageHandler = async (event) => {
        event.preventDefault();
        setRequestStatus(RequestStatus.pending)
        try {
            await sendMessage({
                name: name.trim(),
                email: email.trim(),
                message: message.trim(),
            })
            setRequestStatus(RequestStatus.success)
            setName('');
            setEmail('');
            setMessage('');

        } catch (error) {
            setRequestStatus(RequestStatus.error)
        }
    }

    let notification;

    switch (requestStatus) {
        case RequestStatus.pending:
            notification = {
                title: 'Sending message',
                message: 'Your message is on its way'
            }
            break;
        case RequestStatus.success:
            notification = {
                title: 'Thank you!',
                message: 'Your message has been sent successfully'
            }
            break;
        case RequestStatus.error:
            notification = {
                title: 'Something went wrong',
                message: errorMessage,
            }
            break;
    }


    return (<section className={classes.contact}>
        <h1>How can I help you?</h1>
        <form className={classes.form} onSubmit={sendMessageHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="email">Your email</label>
                    <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)}/>
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor="message">Your message</label>
                <textarea rows={5} id="message" required value={message}
                          onChange={e => setMessage(e.target.value)}></textarea>
            </div>
            <div className={classes.actions}>
                <button>Send message</button>
            </div>
        </form>
        {notification &&
            <Notification title={notification.title} message={notification.message} status={requestStatus}/>}
    </section>)
}


const sendMessage = async (contactDetails: any) => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactDetails)
    })

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || ' Something went wrong')
    }
}
