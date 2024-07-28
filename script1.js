

        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
        import {
            getAuth,
            signInWithEmailAndPassword,
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
        const signin_email = document.getElementById("signin_email");
        const signin_password = document.getElementById("signin_password");
        const user_info = document.getElementById("user_info");
        const signin_btn = document.getElementById("signin_btn");
        const logout_btn = document.getElementById("logout");


        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                console.log(user, "loged in");
                const uid = user.uid;
                auth_container.style.display = "none";
                dashboard.style.display = "flex";
                user_info.innerHTML = user.email;
            } else {
                console.log("user not logged in");
                auth_container.style.display = "flex";
                dashboard.style.display = "none";
                // User is signed out
                // ...
            }
        });

        logout_btn.addEventListener("click", () => {
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                })
                .catch((error) => {
                    // An error happened.
                });
        });



        const signInUser = async () => {
            const email = signin_email.value;
            const password = signin_password.value;
            if (!email || !password) {
                return alert("invalid email or password");
            }
            try {
                const res = await signInWithEmailAndPassword(auth, email, password);
                console.log(res);
            } catch (err) {
                alert(err, "error");
            }
        };

        signin_btn.addEventListener("click", signInUser);

