import Head from 'next/head'
import GoogleButton from 'react-google-button'
import {getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import {useRouter} from "next/router";
import { initializeApp } from 'firebase/app';
import { useEffect } from 'react';

// Task 0: Initialize Firebase
// Replace the following with your app's Firebase project configuration
// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  apiKey: "AIzaSyB8KtWfYOfwAMc6Q11sOlI0sBNClWdJexM",
  authDomain: "interviewtest-71578.firebaseapp.com",
  projectId: "interviewtest-71578",
  storageBucket: "interviewtest-71578.appspot.com",
  messagingSenderId: "727535933021",
  appId: "1:727535933021:web:ab2079db23225269f61fb4",
  measurementId: "G-SC2JNWG7ZG"
};

const app = initializeApp(firebaseConfig);

// GoogleAuthProvider instance
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});
// Firebase Auth instance
const auth = getAuth(app);


export default function Home() {
  //Next.js router
  const router = useRouter();
  useEffect(()=>{
    const response =  getRedirectResult(auth);
    console.log(response);
  },[]);
  
  // Task 1: Implement Google Sign in with Firebase
  // https://firebase.google.com/docs/auth/web/google-signin
  const signIn = () => {
    /*
    1. Use the GoogleAuthProvider to sign in with Firebase
    2. Use signInWithRedirect to redirect the user to the Google sign in page
    3. (Optional) Use getRedirectResult to get the result of the redirect and check out what is inside :)
    4. Redirect the user to the signed-in page using Next.js router
    */
    signInWithRedirect(auth, provider);
    router.push('/signed-in');
      
  }

  return (
    <>
      <Head>
        <title>Sign in to see the public holidays in HK</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <main style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column'}}>
          <h1 className="title">
            Welcome to <a href="https://checkmatehk.io">CheckMate</a>
          </h1>
          <h3>Sign in to see a random programming joke 😳</h3>

          {/* Button for user to sign in with Google */}
          {/* Task 1: Implement Google Sign in with Firebase */}
          <GoogleButton
            label={'Sign in with Google'}
            type="light"
            style={{ width: '50%', display:"flex", justifyContent: 'center', alignItems: 'center', fontFamily: 'Roboto, sans-serif', color:'#444' }}
            onClick={signIn}
          />
        </main>
      </div>
      </>
  )
}
