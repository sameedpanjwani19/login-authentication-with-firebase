import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbncGwPZhto2INvtBi1FDx75YFr1khDWM",
    authDomain: "authentication-b5477.firebaseapp.com",
    projectId: "authentication-b5477",
    storageBucket: "authentication-b5477.appspot.com",
    messagingSenderId: "773575940358",
    appId: "1:773575940358:web:be26a8f822c7ec3108e687",
    measurementId: "G-324RV7L5GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const auth_container = document.getElementById("auth_container");
const dashboard = document.getElementById("dashboard")
const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const user_info = document.getElementById("user_info");
const signup_btn = document.getElementById("signup_btn");
const logout_btn = document.getElementById("logout");

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user, "logged in");
        const uid = user.uid;
        auth_container.style.display = "none";
        dashboard.style.display = "flex";
        user_info.innerHTML = user.email;
    } else {
        console.log("user not logged in");
        auth_container.style.display = "flex";
        dashboard.style.display = "none";
    }
});

logout_btn.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("Sign-out successful.");
        })
        .catch((error) => {
            console.error("An error happened:", error);
        });
});

const createUser = (event) => {
    event.preventDefault();
    const email = signup_email.value;
    const password = signup_password.value;
    if (!email || !password) {
        return alert("Invalid email/password");
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user, "===> success");
            auth_container.style.display = "none";
            dashboard.style.display = "flex";
            user_info.innerHTML = user.email;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, "===> error");
            alert(`Error: ${errorMessage}`);
        });
};

signup_btn.addEventListener("click", createUser);
