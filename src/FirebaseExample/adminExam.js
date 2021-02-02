import React, { useState, useEffect } from 'react'
import { db, firebase } from "../../firebase";


const Admin = () => {
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
      }, []);

    return user ? (<Dash /> ): (
       <div style={{height: `100%`, width: `100%`}}>
 <h1>Admin</h1>
       <button onClick={handlerSignIn}>Enter </button>
       {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>
            <i>{authError.message}</i>
          </p>
          <p>Please try again</p>
        </div>
      )}
       </div>
    )
}



// const Login = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     function onSubmit(e) {
//         e.preventDefault();
//     }
//     const handlerSignIn = async () => {
//         const provider = new firebase.auth.GoogleAuthProvider();
//         try {
//           await firebase.auth().signInWithPopup(provider);
//         } catch (error) {
//           setAuthError(error);
//         }
//       };

//     return (
//         <div className="form-container">
//         <form>
//             <div>
//                 <label>E-mail</label>
//                 <input type="email" value={email} />
//             </div>
//            <div>
//            <label>Password</label>
//             <input type="password" value={password} />
//            </div>
//            <button  onClick={handlerSignIn} >Log In</button>
//         </form>

//         </div>
//     )
// }

const Dash = () => {

    return (
        <h1>Dash</h1>
    )
}

export default Admin