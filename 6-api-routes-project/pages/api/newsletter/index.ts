import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function newsletterHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405);

    const { email } = req.body;

    if (!email || !email.match('^(.+)@(\\S+)$'))
        return res.status(422).json({ message: 'Did not provide a valid email address' });

    const client = await MongoClient.connect('mongodb+srv://jorge:jorge@nextjscourse.fhw8fwf.mongodb.net/events?retryWrites=true&w=majority')
    const db = client.db();

    await db.collection('newsletter').insertOne({ email });
    client.close();

    return res.status(201).json({ message: `email address '${email}' saved` })
}
