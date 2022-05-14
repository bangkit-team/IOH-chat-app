// const Firestore = require('@google-cloud/firestore');

// const db = new Firestore({
//   projectId: 'bangkitproject-348609',
//   keyFilename: './bangkitproject-348609-firebase-adminsdk-kqvha-2d088eeeed.json',
// });

const admin = require('firebase-admin')

var serviceAccount = require("../bangkitproject-348609-firebase-adminsdk-kqvha-2d088eeeed.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bangkitproject-348609-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

const db = admin.database();

module.exports = db

