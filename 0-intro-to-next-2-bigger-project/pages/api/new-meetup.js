import { MongoClient } from "mongodb";

// /api/new-meetup
// serverside code

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data; // destructure the data

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    // in MongoDB, "collections" hold "documents"
    // this is similar to in SQL "tables" hold "entries"
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne({ data });
    //console.log(result);

    // you would add error handling here

    client.close(); // close the database the connection when we're done

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
