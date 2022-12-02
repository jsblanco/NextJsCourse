import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const getFeedbackPath = () => path.join(process.cwd(), 'data', 'feedback.json');
export const getStoredFeedbackItems = (path: string) => JSON.parse(fs.readFileSync(path).toString());

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') return res.status(200).json({ feedback: getStoredFeedbackItems(getFeedbackPath()) });

    if (req.method === 'POST') {
        const { email, feedback } = req.body;
        const newFeedback = {
            id: new Date().getTime(),
            email,
            feedback,
        };

        const totalFeedback = getStoredFeedbackItems(getFeedbackPath());
        totalFeedback.push(newFeedback);
        fs.writeFileSync(getFeedbackPath(), JSON.stringify(totalFeedback));

        res.status(201)
            .json({
                message: 'Feedback saved successfully',
                feedback: newFeedback,
            })
    }
}
