import { useState } from "react";
import "./SignIn.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setIsAuthenticated(true); // Set a flag to indicate the user is authenticated
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
                    setError("Sorry invalid email or password");
                } else {
                    console.log(error);
                    setError(error.message); // Show the error message on failed sign in
                }
            });
    };

    if (isAuthenticated) {
        return <Navigate to="/baby-profile" replace={true} />;
    }

    return (
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <h1 style={{ textAlign: "center", fontSize: '20px', fontFamily: 'Noto Sans Bengali' }}>Sign In To Your Account</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <button type="submit">Sign In</button>
                </div>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default SignIn;
