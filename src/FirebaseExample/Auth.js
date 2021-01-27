import React, { useEffect, useState } from 'react'
import { app } from '../firebase';


export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)


   function login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return app.auth().signOut()
  }


  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

 
  const value = {
    currentUser,
    login,
    // signup,
    logout,
    // resetPassword,
    // updateEmail,
    // updatePassword
  }


   return (
       <AuthContext.Provider value={value}>
 {!loading && children}
       </AuthContext.Provider>
   )

}