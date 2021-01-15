import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD4zxAE_LQ8KWFxgDspw0i1UXApX7L62jU",
    authDomain: "fir-examples-1a3d1.firebaseapp.com",
    databaseURL: "https://fir-examples-1a3d1.firebaseio.com",
    projectId: "fir-examples-1a3d1",
    storageBucket: "fir-examples-1a3d1.appspot.com",
    messagingSenderId: "332670133863",
    appId: "1:332670133863:web:c34989ced80510db7456c2"
  };

export const app = firebase.initializeApp(firebaseConfig)
