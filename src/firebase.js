import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCM8d3ENDCohvfY5FFa5aH8jo3RvpR5xe8",
  authDomain: "react-crud-2c7c1.firebaseapp.com",
  projectId: "react-crud-2c7c1",
  storageBucket: "react-crud-2c7c1.appspot.com",
  messagingSenderId: "927602980879",
  appId: "1:927602980879:web:fe69e39b42699b79a50b7a",
  measurementId: "G-PYNKVY2VS9"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()