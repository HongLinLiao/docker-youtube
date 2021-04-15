import firebase from 'firebase';

export const signInWithGoogle = async () => {
    // google auth provider
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
}

export const signOut = async() => {
    await firebase.auth().signOut();
}