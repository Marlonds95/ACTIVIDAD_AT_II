// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
apiKey: "AIzaSyBhZivWObWThBTHyG5KHFJdaejSQZ_ywHI",
  authDomain: "actividad-tienda.firebaseapp.com",
  projectId: "actividad-tienda",
  storageBucket: "actividad-tienda.appspot.com",
  messagingSenderId: "115106293522",
  appId: "1:115106293522:web:e3d1e9b4ac13113813b5cb",
  databaseURL: "https://actividad-tienda-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

//Referencia al servicio de BDD
export const dbRealTime = getDatabase(firebase);