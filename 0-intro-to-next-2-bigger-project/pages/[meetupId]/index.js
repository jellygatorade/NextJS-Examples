import { Fragment } from "react";
import Head from "next/head";

import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

// need this function in dynamic pages to tell NextJS for which dynamic parameter values this page should be pre-generated
// here we will extract the _id property from the MongoDB entries to make a page for each one with the _id as the URL subdirectory
export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  // in MongoDB, "collections" hold "documents"
  // this is similar to in SQL "tables" hold "entries"
  const meetupsCollection = db.collection("meetups");

  // Using MongoDB db.collection.find() method
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  // Verify we have selected all the meetup ids to define each as a supported path
  // console.log(
  //   meetups.map((meetup) => {
  //     return meetup._id.toString();
  //   })
  // );

  client.close();

  return {
    //fallback: false, // indicates we have defined all supported paths
    fallback: "blocking", // setting fallback to true or 'blocking' tells NextJS that the list of paths might not be exhaustive - see https://stackoverflow.com/questions/67787456/what-is-the-difference-between-fallback-false-vs-true-vs-blocking-of-getstaticpa
    paths: meetups.map((meetup) => {
      return { params: { meetupId: meetup._id.toString() } };
    }),
  };
}

// executes for every page (so for every meetupId value), allows you to fetch data for that meetup and return props for that meetup
export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId; // get from the URL

  // Verify the url string
  //console.log(`page context url is ${meetupId}`);

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  // in MongoDB, "collections" hold "documents"
  // this is similar to in SQL "tables" hold "entries"
  const meetupsCollection = db.collection("meetups");

  // Using MongoDB db.collection.findOne() method
  // https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
  // and ObjectId() - https://www.mongodb.com/docs/manual/reference/method/ObjectId/ - to convert the string to a MongoDB ObjectId
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  // Verify the url string was used to select the correct meetup _id
  //console.log(`selectedMeetup is ${selectedMeetup._id.toString()}`); // logs to server console

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.data.image,
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        description: selectedMeetup.data.description,
      },
    },
    revalidate: 3600,
  };
}

export default MeetupDetails;
