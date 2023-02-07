import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// Now instead using MongoDb

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];

// props is returned by getStaticProps (below)
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// exporting getStaticProps only works within the /pages/ directory (in NextJS page components)
// getStaticProps is executed during the pre-rendering process - it is executed before the component functions
// getStaticProps is only executed during the build process - it is not included in the built pages (it will never be included for client execution)
//
// revalidate property - ensure your page is updated regularly after deployment
// specify how often to regenerate the page on the server (in seconds) if there are requests coming in on the server
// if your data changes every hour, revalidate: 3600, might be a good setting
//
// sometimes you want to regenerate a page for every request for it - in this case you will use getServerSideProps
// this function will always run on the server after deployment

// if you don't have data that changes all the time (multiple times per second)
// and if you don't need access to the request object (say for authentication), getStaticProps is better
// (these are the two cases for which getServerSideProps is a better choice^)
// because there you pre-generate the html file, it can be stored and served by a CDN, which is faster than fetching and regenerating that page for each request

export async function getStaticProps() {
  // fetch data from an API

  // code here could be outsourced to our own NextJS server's api, like:
  // fetch('/api/meetups')
  // and that route could process the fetch below
  // but instead we're going to fetch directly from this index.js page
  // because it all happens on the server (and not the user/client/browser) anyway because of getStaticProps()

  // you could also just outsource this connection to the MongoDB into it's own function / module
  // (connect to MongoDB -> get and return the meetsupCollection)
  // and just call that here (the home page), and within "/new-meetup/index.js", and within "/[meetupId]/index.js"
  // but we're writing the code out here to be explicit about what can run where for learning purposes

  //MONGODB_URI string is "mongodb+srv://username:password@something.mongodb.net/meetups?retryWrites=true&w=majority"

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  // in MongoDB, "collections" hold "documents"
  // this is similar to in SQL "tables" hold "entries"
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.data.title,
          address: meetup.data.address,
          image: meetup.data.image,
          description: meetup.data.description,
          id: meetup._id.toString(), // convert the MondoDB _id to a useable string
        };
      }),
    },
    revalidate: 3600,
  };
}

// what is the context param passed here? it contains the request/response objects

// export async function getServerSideProps(context) {
//   const req = context.req; // request/response objects like in Express middleware
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export default HomePage;
