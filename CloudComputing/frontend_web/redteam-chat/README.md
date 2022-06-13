# Redteam Frontend For Admin

This is frontend for admin can monitor red team chat app.

## Frontend
  This frontend use Reactjs as framework. The purpose of this frontend is to monitor user and group that have been made or register. This frontend also use for approval user, annnouncement post, and see the feedback history. This frontend only for admin and deploy in vercel that connect to backend-admin from google cloud App Engine
  
There is some depedencies you must install in your code editor to run RedTeam Frontend:
  - axios
  - firebase
  - react-minimal-pie-chart
  - react-router-dom

npx create-react-app my-app

## Get Started Backend (NodeJs)
- Install NPM (if you don't have)
  - Check in your terminal or command prompt
    ```
    npm -v
    ```
- Initialize folder as NPM project
  ```
  npx create-react-app redteam-frontend
  cd redteam-frontend
  ```
  - this code will make package.json
- Install all depedencies above
  - You can use this command to install the package
    ```
    npm install firebase
    ```
  - Try to install all package in the list above. You can also use this command to install all package in package.json
    ```
    npm install
    ```

- Just start our backend server with this command
  ```
  npm start
  ```
