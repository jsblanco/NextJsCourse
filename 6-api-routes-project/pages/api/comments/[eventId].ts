import { InsertOneResult, MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import {
	getAllDocuments,
	getClient,
	insertDocument,
} from '../../../helpers/db-util';

export default async function commentsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { eventId } = req.query;

	if (!eventId || Array.isArray(eventId)) return res.status(400);

	let client: MongoClient;

	try {
		client = await getClient();
	} catch (error) {
		return res
			.status(500)
			.json({ message: `Could not connect to the database` });
	}

	if (req.method === 'POST')
		await addNewComment(client, eventId, req.body, res);
	if (req.method === 'GET') await fetchComments(client, eventId, res);

	client.close();
}

const addNewComment = async (
	client: MongoClient,
	eventId: string,
	commentData: any,
	res: NextApiResponse
) => {
	const { email, name, text } = commentData;

	if (!email || !email.match('^(.+)@(\\S+)$'))
		return res
			.status(422)
			.json({ message: 'Did not provide a valid email address' });

	if (!name || !name.trim())
		return res.status(422).json({ message: 'Did not provide a valid  name' });

	if (!text || !text.trim())
		return res.status(422).json({ message: 'Did not provide a valid comment' });

	const comment = { email, name, text, eventId };

	let response: InsertOneResult<any>;

	try {
		response = await insertDocument(client, 'comments', comment);
		res.status(201).json({
			message: 'Added comment!',
			comment: { ...comment, _id: response.insertedId },
		});
	} catch (e) {
		res.status(500).json({ message: 'Could not save comment' });
	}
};

const fetchComments = async (
	client: MongoClient,
	eventId: string,
	res: NextApiResponse
) => {
	let comments: any[];

	try {
		comments = (await getAllDocuments(client, 'comments', { _id: -1 })).filter(
			(comment) => comment.eventId === eventId
		);
		res.status(200).json({ comments });
	} catch (e) {
		res
			.status(500)
			.json({ message: 'Could not fetch comments for event ' + eventId });
	}
};
