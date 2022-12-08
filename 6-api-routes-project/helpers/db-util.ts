import { Collection, MongoClient, Sort } from 'mongodb';

export const getClient = async () =>
	await MongoClient.connect(
		'mongodb+srv://jorge:jorge@nextjscourse.fhw8fwf.mongodb.net/events?retryWrites=true&w=majority'
	);

export const insertDocument = async (
    client: MongoClient,
	collection: string,
	document: { [k: string]: string }
) => {
	const db = client.db();

	return await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (
	client: MongoClient,
	collection: string,
    sort:  Sort | string
) => {
	const db = client.db();

	return await db.collection(collection).find().sort(sort).toArray();
};
