// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAsncBOCcHHuhF-TUyzZtD-ipiptpHeEKo",
authDomain: "bangkitproject-348609.firebaseapp.com",
databaseURL: "https://bangkitproject-348609-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "bangkitproject-348609",
storageBucket: "bangkitproject-348609.appspot.com",
messagingSenderId: "1055177951009",
appId: "1:1055177951009:web:b59e1b28a8e9683195e060",
measurementId: "G-ZXYN87GLLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
export default database;