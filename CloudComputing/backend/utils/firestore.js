const admin = require('firebase-admin')
// const { getStorage } = require('firebase-admin/storage');

var serviceAccount = require("../bangkitproject-348609-firebase-adminsdk-kqvha-2d088eeeed.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bangkitproject-348609-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // storageBucket: process.env.CLOUD_BUCKET
});

const db = admin.database();
// const bucket = getStorage().bucket();

module.exports = db
// module.exports = bucket

