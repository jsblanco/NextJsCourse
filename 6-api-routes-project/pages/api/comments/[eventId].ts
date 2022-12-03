import { NextApiRequest, NextApiResponse } from 'next';
import { array } from 'prop-types';

export default function commentsHandler(req: NextApiRequest, res: NextApiResponse) {
    const { eventId } = req.query;

    if (!eventId || Array.isArray(eventId)) return res.status(400);

    if (req.method === 'POST') return addNewComment(eventId, req.body, res)
    if (req.method === 'GET') return fetchComments(eventId, res)
}

const addNewComment = (eventId: string, commentData, res: NextApiResponse) => {
    const { email, name, text } = commentData;

    if (!email || !email.match('^(.+)@(\\S+)$')) return res.status(422).json({ message: 'Did not provide a valid email address' });

    if (!name || !name.trim()) return res.status(422).json({ message: 'Did not provide a valid  name' });

    if (!text || !text.trim()) return res.status(422).json({ message: 'Did not provide a valid comment' });

    const comment = {
        email, name, text,
        id: new Date().getTime(),
    }

    console.log(comment)
    return res.status(201).json({ message: 'Added comment!', comment })

}

const fetchComments = (eventId: string, res: NextApiResponse) => {
    const comments = [
        { id: 1, name: 'Hannibal', text: 'Crossing the Alps' },
        { id: 2, name: 'Scipio', text: 'Get ready for war' },
    ]

    return res.status(200).json({ comments })
}
