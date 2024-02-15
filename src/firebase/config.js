import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services 

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp

const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }