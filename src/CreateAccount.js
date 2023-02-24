import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const CreateAccount = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const createAccount = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                onClose(); // Close the pop-up window on successful sign up
            })
            .catch((error) => {
                console.log(error);
                setError(error.message); // Show the error message on failed sign up
            });
    };

    return (
        <div className="create-account-container">
            <form onSubmit={createAccount}>
                <h1 style={{ textAlign: "center", fontSize: '20px', fontFamily: 'Noto Sans Bengali' }}>Create an Account</h1>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <button type="submit">Create Account</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default CreateAccount;
