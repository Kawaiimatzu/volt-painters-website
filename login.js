import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyALXlWFgszfCk8-0StQOKvu4zeRuDR4PlI",
  authDomain: "volt-painters.firebaseapp.com",
  projectId: "volt-painters",
  storageBucket: "volt-painters.firebasestorage.app",
  messagingSenderId: "475163051101",
  appId: "1:475163051101:web:e5d44f01a1666e79a0b9b4",
  measurementId: "G-XRSBC0PJE5"
};

const isLoggedIn =
localStorage.getItem("voltAdmin");

if(isLoggedIn === "true"){

  window.location.href = "/dashboard";


}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


document.getElementById("loginForm").addEventListener("submit", (e) => {

  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

      alert("Login Successful!");

      localStorage.setItem("voltAdmin", "true");

    window.location.href = "/dashboard";

    })

    .catch((error) => {

      alert(error.message);

    });

});