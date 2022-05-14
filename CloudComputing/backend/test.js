var admin = require("firebase-admin");

var serviceAccount = require("./bangkitproject-348609-firebase-adminsdk-kqvha-2d088eeeed.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// function getQuote() {
//     const quoteData = {
//     quote: "random",
//     author: "String"
//     };

//     return db.collection("sampleData").doc("inspiration").set(quoteData).then(() => {
//     console.log("new quote was written to the database");})
// }
    
// getQuote();