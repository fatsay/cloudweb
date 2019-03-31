import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAKKUQQyo2olcCXTpUZTZk2DNpNummYx8I",
    authDomain: "cloudproject-f25f2.firebaseapp.com",
    databaseURL: "https://cloudproject-f25f2.firebaseio.com",
    projectId: "cloudproject-f25f2",
    storageBucket: "cloudproject-f25f2.appspot.com",
    messagingSenderId: "581323656665"
};

const fire=firebase.initializeApp(config);
export default fire;