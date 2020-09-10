import firebase from 'firebase'
// import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD-UvF_S0ypiTlGf6NzbLpnchE8clBX6BU",
  authDomain: "ninja-smoothies-a4934.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-a4934.firebaseio.com",
  projectId: "ninja-smoothies-a4934",
  storageBucket: "ninja-smoothies-a4934.appspot.com",
  messagingSenderId: "501951728587",
  appId: "1:501951728587:web:9d5c0c4523dce706f4844e"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()
