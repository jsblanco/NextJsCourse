import { ClientRequest } from 'http';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getClient, insertDocument } from '../../../helpers/db-util';

export default async function newsletterHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return res.status(405);

	const { email } = req.body;

	if (!email || !email.match('^(.+)@(\\S+)$'))
		return res
			.status(422)
			.json({ message: 'Did not provide a valid email address' });

	let client: MongoClient;

	try {
		client = await getClient();
	} catch (error) {
        return res.status(500).json({ message: `Could not connect to the database` })
    }

    try {
        await insertDocument(client, 'newsletter', { email });
        client.close();
		res.status(201).json({ message: `email address '${email}' saved` });
	} catch (error) {
        res.status(201).json({ message: `Could not insert data into database` })
    }
}
