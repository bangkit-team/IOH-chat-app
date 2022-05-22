const {Storage} = require('@google-cloud/storage');
const path = require("path");
//connect dotenv
require("dotenv").config();

const gc = new Storage({
    keyFilename: {
        "type": process.env.GCP_TYPE,
        "project_id": process.env.GCP_PROJECT_ID,
        "private_key_id": process.env.GCP_PRIVATE_KEY_ID,
        "private_key": process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.GCP_CLIENT_EMAIL,
        "client_id": process.env.GCP_CLIENT_ID,
        "auth_uri": process.env.GCP_AUTH_URI,
        "token_uri": process.env.GCP_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.GCP_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.GCP_CLIENT_X509_URL    
    },
    projectId: process.env.GCP_PROJECT_ID
});

const chatAppBucket = gc.bucket('bangkit_chatapp_bucket');

module.exports = chatAppBucket