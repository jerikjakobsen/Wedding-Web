# Wedding-Web
### Description
A collection of websites created to manage a wedding rsvps, news, and contact with guests. There are three folders, jenawedding, jena-admin, and jenaFunctions.
- jenawedding is the folder which contains the frontend that guests will use to input their rsvp, input their contact information, and find updates on the wedding.
- jena-admin is the folder which contains the frontend for the wedding operator to use to manage the guests.
- jenaFunctions is the folder which contains the backend for all http requests needed for the frontend for both the admin website and the guest website.

## Tech
- React
- Express
- Firebase Cloud Firestore (Database)
- Firebase Hosting

## Main Wedding Website
(jenawedding Folder)

https://mattandjenaswedding.info/

This website was built as a single page app bootstrapped by create-react-app with react. Guest's use this website to rsvp for the wedding, input their email for additional news about the wedding and 
recieve general information regarding the wedding. In order to rsvp guest must search their name, then their name and the names of the members in their party will appear, which will have an rsvp and no rsvp option.

To host the website on localhost:3000

yarn install

yarn start

## Admin Wedding Website
(jena-admin Folder)

This website was built as a single page app bootstrapped by create-react-app with react.
It's main purpose is to manage guests by displaying guest rsvp status, allows the operator to add and remove guests from the guest list, 
and allows the operator to search and filter guests.

To host the website on localhost:3000

yarn install

yarn start

## Wedding Functions
(jenaFunctions Folder)

This is the backend for both the Main Wedding website and the Admin Wedding Website. It contains all endpoints for every request made from both the websites. This was created using express and is hosted on firebase functions.
These endpoints include, getting the guest list from the database, getting specific guests from the database, updating a guest's rsvp status, adding and removing guests from the guest list, and adding guest emails to the database.
