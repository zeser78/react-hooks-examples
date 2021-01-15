import React, { useEffect, useState } from 'react'
import { app } from './firebase'

const db = app.firestore()

const FirestoreStorageExample = () => {
    const [fileUrl, setFileUrl] = useState(null)
    const [users, setUsers] = useState([])


    const onFileChange = async (e) => {
        const file = e.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        // .then(() => {
        //     console.log("Upload file", file.name)
        // })
        setFileUrl(await fileRef.getDownloadURL())

    }

    const onSubmit = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        if(!username) {
            return
        }
        // db.collection("user-avatar").doc(username).set({
        //     name: username,
        //     avatar: fileUrl
        // })
        db.collection("user-avatar").add({
            name: username,
            avatar: fileUrl
        })
    }

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //     const usersCollection = await db.collection("user-avatar").get()
    //     console.log(usersCollection)
    //         setUsers(usersCollection.docs.map(doc => {
    //             return doc.data()
    //         }))
    //         fetchUsers()
    //     }
    // },[])
    useEffect(() => {
        const fetchData = async () => {
          return (
            db
              .collection("user-avatar")
              .onSnapshot((snap) => {
                const docs = [];
                snap.forEach((doc) => {
                  docs.push({
                    ...doc.data(),
                    id: doc.id,
                  });
                });
                setUsers(docs);
              })
          );
        };
        fetchData();
      }, []);


    return (
        <>
        <div>
        <h3>Firestore Storage</h3>
        <form onSubmit={onSubmit}>
            <input type="file" onChange={onFileChange} />
            <input type="text" name="username" placeholder="NAME" />
            <button>Submit</button>
        </form>
        </div>
       <div>
       <ul>
           {users.map(user => {
               return (
                   <div key={user.id}>
                      <ul>
                          <li><p>{user.id}</p> <img  width="100" hegiht="100" src={user.avatar} alt={user.name}/>
                        <p>{user.name}</p>
                        </li>
                      </ul>
                     
                   </div>
               )
           })}
        </ul>
       </div>

        </>
    )
}

export default FirestoreStorageExample