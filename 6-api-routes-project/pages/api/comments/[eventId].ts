import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { array } from "prop-types";

export default async function commentsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;

  if (!eventId || Array.isArray(eventId)) return res.status(400);

  const client = await MongoClient.connect(
    "mongodb+srv://jorge:jorge@nextjscourse.fhw8fwf.mongodb.net/events?retryWrites=true&w=majority"
  );
  const db = client.db();

  if (req.method === "POST") await addNewComment(db, eventId, req.body, res);
  if (req.method === "GET") await fetchComments(db, eventId, res);

  client.close();
}

const addNewComment = async (
  db: Db,
  eventId: string,
  commentData,
  res: NextApiResponse
) => {
  const { email, name, text } = commentData;

  if (!email || !email.match("^(.+)@(\\S+)$"))
    return res
      .status(422)
      .json({ message: "Did not provide a valid email address" });

  if (!name || !name.trim())
    return res.status(422).json({ message: "Did not provide a valid  name" });

  if (!text || !text.trim())
    return res.status(422).json({ message: "Did not provide a valid comment" });

  const comment = { email, name, text, eventId };
  const response = await db.collection("comments").insertOne(comment);

  res
    .status(201)
    .json({
      message: "Added comment!",
      comment: { ...comment, id: response.insertedId },
    });
};

const fetchComments = async (db: Db, eventId: string, res: NextApiResponse) => {
  const comments = await (
    await db.collection("comments").find().sort({ _id: -1 }).toArray()
  ).filter((comment) => comment.eventId === eventId);

  res.status(200).json({ comments });
};
