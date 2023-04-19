import Head from 'next/head'
import GoogleButton from 'react-google-button'
import {getAuth, signInWithRedirect,getRedirectResult,GoogleAuthProvider} from "firebase/auth";
import {useRouter} from "next/router";
import { initializeApp } from 'firebase/app';
import { useEffect,useState } from 'react';


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

  // Task 1: Implement Google Sign in with Firebase
  // https://firebase.google.com/docs/auth/web/google-signin

  ////////////////////////      implement ONE:  load at second time     //////////////////////////
  // const signIn = () => {
  //  
  //   signInWithRedirect(auth, provider);
  //   router.replace('/signed-in');
  // }



  ////////////////////////      implement TWo:  load for some time     //////////////////////////

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check if the user is signed in
    getRedirectResult(auth)
      .then((result) => {
        // Step 3: Check if the user is signed in
        if (result.user) {
          // Set the state to indicate that the user is signed in
          setIsSignedIn(true);
          // Step 4: Redirect the user to the signed-in page using Next.js router
          router.push('/signed-in');
        }
      })
      .catch((error) => {
        // handle the sign-in error here
        console.log(error);
      });
  }, []);

  const signIn = () => {
    /*
    1. Use the GoogleAuthProvider to sign in with Firebase
    2. Use signInWithRedirect to redirect the user to the Google sign in page
    */
    signInWithRedirect(auth, provider);
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
