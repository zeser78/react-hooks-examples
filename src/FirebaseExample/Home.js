import React, { useContext, useEffect, useState } from 'react'
// import { BrowserRouter as Router, Switch, Route,  Redirect } from "react-router-dom"
import { app } from "../firebase";
import FirestoreStorageExample from './FirebaseStorageExample';
import { AuthContext, AuthProvider } from './Auth'
import {Router, Redirect } from "@reach/router"

const NotFound = () => <p>Sorry, not found</p>

const Home = () => {

    return (
     <>
<h1>Home</h1>
<AuthProvider>
  <Router>
  {/* <Switch> */}
  <Login2 path="/" />
      <PrivateRoute as={FirestoreStorageExample} path="/dash" />
      {/* <PrivateRoute exact path="/" component={Dash} /> */}
      {/* <PrivateRoute path="/storage" component={FirestoreStorageExample} /> */}
      {/* <Route path="/login" component={Login2} /> */}
     
       {/* </Switch> */}
       {/* <Login2 path="/login"/> */}
       <NotFound default />
  </Router>

</AuthProvider>

        </>
    )
}

const db = app.firestore()

const Login2 = () => {
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);

  
    const handlerSignIn = async (event) => {
      event.preventDefault();
      const {email, password } = event.target.elements
      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value);
      } catch (error) {
setAuthError(error)
      }
    };
    
    // const {currentUser } = useContext(AuthContext)

    // console.log(currentUser)

    useEffect(() => {
        // to persist login
        return app.auth().onAuthStateChanged((firebaseUser) => {
          if (firebaseUser) {
            const user = {
              // displayName: firebaseUser.displayName,
              // photoUrl: firebaseUser.photoURL,
              uid: firebaseUser.uid,
            };
            setUser(user);
            db.collection("usersExample").doc(user.uid).set(user, { merge: true });
          } else {
            setUser(null);
          }
        });
    },[])
        
    // const [currentUser, setCurrentUser] = useState(null)

    //   useEffect(() => {
    //       app.auth().onAuthStateChanged(setCurrentUser)
    //   },[])
    

    return user ? (
      <Router>
        {/* <Redirect from="" to="admin" /> */}
        <FirestoreStorageExample path="/admin" />
</Router>
    ) : (
      <Router>
         {/* <Redirect from="/admin" to="/" /> */}
      <Login path="/" handlerSignIn={handlerSignIn} />
        </Router>
    )
}


export default Home

const Login = ({handlerSignIn}) => {

  return (
    <>
 <form onSubmit={handlerSignIn}>
          <label>Email</label>
          <input name="email" type="email" placeholder="email" />
          <label>Password</label>
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Log in</button>
      
      </form>

    </>
  )
}




const PrivateRoute = (props) => {
  const {currentUser } = useContext(AuthContext)
  // const { currentUser } = useAuth()

  let { as: Comp, ...moreProps} = props;

  return currentUser ? <Comp {...moreProps} /> : <Login2 />
  // return currentUser ? <Comp {...moreProps} /> : <Redirect to="/" replace={true} noThrow={true}  />

  // return (
  //   <Router
  //     {...rest}
  //     render={props => {
  //       return currentUser ? <Component {...props} /> : <Login2 /> 
  //       // return currentUser ? <Component {...props} /> : <Redirect to="/login" />
  //     }}
  //   ></Router>
  // )
}


const Dash = () => {

  return (
    <>
<h1>Dash</h1>
    </>
  )
}