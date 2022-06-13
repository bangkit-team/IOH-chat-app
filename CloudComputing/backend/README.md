# Redteam Backend For IoH Users App

This is backend and database structure for user app. 

## Backend
  This backend user Nodejs as base and ExpressJs as framework. This backend deploy in Google Cloud Compute Engine and we reserve the public IP so it can't change if the VM down or restart. We install nginx server and open proxy for public access. For secure purpose, we buy domain in niagahoster and register to cloudflare to install SSL for our endpoint compute engine
  
There is some depedencies you must install in your code editor to run RedTeam Backend:
 - @google-cloud/storage (For access google cloud storage in backend nodejs)
 - axios (to request to ML backend with flask)
 - bcrypt (to hash our password)
 - cors (make FE or maybe Kotlin can easily get API from BE without credentials problem)
 - dotenv (to make .env file for secret variabel)
 - express (framework for Nodejs)
 - firebase-admin (for access firebase realtime database)
 - joi (for validate input from user or device)
 - jsonwebtoken (for authorization and authentication)
 - multer (to upload image from Apps to BE folder)
 - nodemon (for easy to run our code in localhost)

## Get Started Backend (NodeJs)
- Install NodeJs and NPM (if you don't have)
  - Check in your terminal or command prompt
    ```
    node -v
    npm -v
    ```
- Initialize folder as NPM project
  ```
  npm init
  ```
  - this code will make package.json
- Install all depedencies above
  - You can use this command to install the package
    ```
    npm install express
    ```
  - Try to install all package in the list above. You can also use this command to install all package in package.json
    ```
    npm install
    ```
- Make .env file for secret code
  - We don't know must to publis the .env file or no. Maybe we just wait for the confirmation

- Just start our backend server with this command
  ```
  npm install
  ```

## Database
  for the database we use firebase realtime database, because we need realtime communication and we think for the chat app it proper to use noSQL. Firebase realtime database also can connect to GCP billing. We just read realtime database documentation in firebase official documentation to learn how to read, write and make structure of the database
