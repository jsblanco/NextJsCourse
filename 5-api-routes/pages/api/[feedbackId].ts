import { NextApiRequest, NextApiResponse } from 'next';
import { getFeedbackPath, getStoredFeedbackItems } from './feedback';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.query)
    const feedbackId = req.query?.feedbackId ?? '';
    const requestedFeedback = getStoredFeedbackItems(getFeedbackPath()).find(item => +item.id === +feedbackId)

    if (requestedFeedback) return res.status(200).json({ feedback: requestedFeedback })

}
