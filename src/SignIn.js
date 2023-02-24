import { useState } from "react";
import "./SignIn.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const SignIn = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                onClose(); // Close the pop-up window on successful sign in
            })
            .catch((error) => {
                console.log(error);
                setError(error.message); // Show the error message on failed sign in
            });
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signIn}>
            <h1 style={{ textAlign: "center", fontSize: '20px', fontFamily: 'Noto Sans Bengali' }}>Sign In To Your Account</h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Sign In</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default SignIn;
