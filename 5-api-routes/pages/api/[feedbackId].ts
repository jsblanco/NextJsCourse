import { NextApiRequest, NextApiResponse } from 'next';
import { getFeedbackPath, getStoredFeedbackItems } from './feedback';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const feedbackId = req.query?.feedbackId;
    const requestedFeedback = feedbackId && getStoredFeedbackItems(getFeedbackPath()).find(item => parseInt(item.id) === parseInt(feedbackId.toString()))

    if (requestedFeedback) return res.status(200).json({ feedback: requestedFeedback })
}
