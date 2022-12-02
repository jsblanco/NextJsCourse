import { FormEvent, useRef, useState } from 'react';

function HomePage() {
    const emailRef = useRef<HTMLInputElement>()
    const feedbackRef = useRef<HTMLTextAreaElement>()

    const [feedback, setFeedback] = useState([])

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const feedback = feedbackRef.current.value;

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify({ email, feedback }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(console.log);
    }


    const onLoad = () => fetch('/api/feedback', {
        method: 'get',
    })
        .then(res => res.json())
        .then(data => setFeedback((data).feedback));


    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Your email</label>
                    <input type="email" id="email" ref={emailRef}/>
                </div>
                <div>
                    <label htmlFor="feedback">Your feedback</label>
                    <textarea rows={5} id="feedback" ref={feedbackRef}></textarea>
                </div>
                <button type={'submit'}>Submit</button>
            </form>
            <hr/>
            <button onClick={onLoad}>Load feedback</button>
            <ul>
                {feedback.map(item => <li key={item.id}>{item.email}: {item.feedback}</li>)}
            </ul>
        </div>
    );
}

export default HomePage;
