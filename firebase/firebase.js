// Import the functions you need from the SDKs you need
import { signOut, getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { serverTimestamp, getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
  measurementId: "xxx"
};

// Initialize Firebase
window.app = initializeApp(firebaseConfig);

window.auth = getAuth(app);
window.db = getFirestore(app);
window.analytics = getAnalytics(app);

// Attach to window for global access
window.app = app;
window.auth = auth;
window.db = db;
window.analytics = analytics;

const ROOT = "dictionary";

// Check if a string exists in Firestore
window.look = async function(stringKey) {
  const docRef = doc(db, ROOT, stringKey);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Add a string to Firestore
window.push = async function(stringKey) {
  const user = auth.currentUser;
  if (!user) return;

  const docRef = doc(db, ROOT, stringKey);
  await setDoc(docRef, {
    createdAt: serverTimestamp(),
    createdBy: { /* uid: user.uid, */ email: user.email }
  });
};

// Sign in with email/password
window.signIn = async function(email, password) {
  const user = auth.currentUser;
  if (user) return;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

window.logout = async function() {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Detect current login state
window.isLoggedIn = function(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) { callback({ loggedIn: true, user });
    } else { callback({ loggedIn: false }); }
  });
};