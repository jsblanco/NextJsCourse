import { useState } from 'react';
import { getFeedbackPath, getStoredFeedbackItems } from '../api/feedback';

export default function FeedbackPage({ feedback }) {

    const [feedbackData, setFeedbackData] = useState<{ email: string, feedback: string, id: number }>();

    const loadFeedbackHandler = (id: number) =>
        fetch(`/api/${id}`).then(res => res.json())
            .then(data => setFeedbackData(data.feedback))

    return (
        <>
            <ul>
                {feedback.map(item => (
                    <li
                        style={item.id === feedbackData?.id ? { fontWeight:  'bold'} : {}}
                        key={item.id}>
                        {item.email}:{' '}
                        <button
                            onClick={loadFeedbackHandler.bind(null, item.id)}>
                            Load details
                        </button>
                    </li>
                ))}
            </ul>
            {feedbackData && <p>{feedbackData.feedback}</p>}
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {
            feedback: getStoredFeedbackItems(getFeedbackPath()),
        }
    }
}
