import firebase from 'firebase';

const firebaseConfig = {
    // Your Firebase Config
};

// firebase initialize
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
