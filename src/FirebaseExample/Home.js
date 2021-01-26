import React, { useEffect, useState } from 'react'
import { app } from '../firebase'
import { AuthContext, AuthProvider } from './Auth'


const Home = () => {

    return (
        <>
<h1>Home</h1>
<AuthProvider>

</AuthProvider>
        </>
    )
}

export default Home

const Login = () => {
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);

  
    const handlerSignIn = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        await firebase.auth().signInWithPopup(provider);
      } catch (error) {
        setAuthError(error);
      }
    };
    

    useEffect(() => {
        // to persist login
        return firebase.auth().onAuthStateChanged((firebaseUser) => {
          if (firebaseUser) {
            const user = {
              displayName: firebaseUser.displayName,
              photoUrl: firebaseUser.photoURL,
              uid: firebaseUser.uid,
            };
            setUser(user);
            db.collection("users").doc(user.uid).set(user, { merge: true });
          } else {
            setUser(null);
          }
        });
    },[])
        
    const [currentUser, setCurrentUser] = useState(null)

      useEffect(() => {
          app.auth().onAuthStateChanged(setCurrentUser)
      },[])
    

    return (
        <>
<form onSubmit={handleLogIn}>
    <label>Email</label>
    <input name="email" type="email" placeholder="email" />

</form>
        </>
    )
}