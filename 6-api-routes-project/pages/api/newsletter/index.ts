import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";


export default async function newsletterHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405);

    const { email } = req.body;

    if (!email || !email.match('^(.+)@(\\S+)$'))
        return res.status(422).json({ message: 'Did not provide a valid email address' });

    const client = await clientPromise;
    // const client = await MongoClient.connect('mongodb+srv://root:XC5mjpQNbaedjs3p@nextjscourse.fhw8fwf.mongodb.net/newsletter?retryWrites=true&w=majority')
    const db = client.db('newsletter');

    await db.collection('emails').insertOne({ email });
    client.close().then();

    return res.status(201).json({ message: `eMail address '${email}' saved` })
}
