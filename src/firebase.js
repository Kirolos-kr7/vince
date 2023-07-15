import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCrB_ryvlydbAqGaM5r7kZKPrXe3qVZEoQ',
  authDomain: 'vince-x.firebaseapp.com',
  projectId: 'vince-x',
  storageBucket: 'vince-x.appspot.com',
  messagingSenderId: '1063750321419',
  appId: '1:1063750321419:web:9d85e25f64cfb3ed8d4e0e',
  measurementId: 'G-GX24MLJTL5',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const timestamp = firebase.firestore.Timestamp
export const gProvier = new firebase.auth.GoogleAuthProvider()

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}
