import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWfcSVvBK5160YDbXKWzKx5PUxf_KSJx8",
  authDomain: "miniblogreact-3f3a6.firebaseapp.com",
  projectId: "miniblogreact-3f3a6",
  storageBucket: "miniblogreact-3f3a6.appspot.com",
  messagingSenderId: "318555005698",
  appId: "1:318555005698:web:4e6c76b5a7c350825bd81b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app); 

export { db, auth };
