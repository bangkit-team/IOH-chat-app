const {Storage} = require('@google-cloud/storage');
const path = require("path");

const gc = new Storage({
    keyFilename: path.join(__dirname, "../bangkitproject-348609-03856079203d.json"),
    projectId: "bangkitproject-348609"
});

const chatAppBucket = gc.bucket('bangkit_chatapp_bucket');

module.exports = chatAppBucket