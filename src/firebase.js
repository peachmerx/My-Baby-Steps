import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEE2rD-Ep2fw15Ce1nmRxspEemjoWSEcA",
    authDomain: "my-baby-steps-project-68dde.firebaseapp.com",
    projectId: "my-baby-steps-project-68dde",
    storageBucket: "my-baby-steps-project-68dde.appspot.com",
    messagingSenderId: "173245223590",
    appId: "1:173245223590:web:c5c67bd980397817265a67"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);