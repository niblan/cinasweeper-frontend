import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-2H0yAjAiuoqm_Xg_Zeq1vrPQ1Sr1HrU",
  authDomain: "cinasweeper.firebaseapp.com",
  projectId: "cinasweeper",
  storageBucket: "cinasweeper.appspot.com",
  messagingSenderId: "669634161466",
  appId: "1:669634161466:web:d835fc561feefa79b37e03",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const login = async () => {
  const result = await signInWithPopup(auth, provider);
  console.log(result);
  return result;
};
export const logout = async () => {
  await signOut(auth);
};
