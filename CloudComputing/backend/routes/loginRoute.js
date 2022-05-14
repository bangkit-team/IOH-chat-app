const express = require('express')
const router = express.Router()
const db = require('../utils/firestore')
const {loginValidation} = require('../validate')
const bcrypt = require('bcrypt');
// const getAuth = require('../utils/authentication')

const userRef = db.ref('/users');

router.post('/',(req, res) =>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)


    // userRef.once(req.body.email, (snapshot) => {
    //     console.log(snapshot.val());
    // }, (errorObject) => {
    //     console.log('The read failed: ' + errorObject.name);
    // });
    // getAuth()
    // .getUserByEmail(req.body.email)
    // .then((userRecord) => {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    // })
    // .catch((error) => {
    //     console.log('Error fetching user data:', error);
    // });

    res.send('success');
    //password is correct
    // const validPass = await bcrypt.compare(req.body.password, user.password);



})


module.exports = router