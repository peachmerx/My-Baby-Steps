import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import BabyDetails from "./BabyDetails";

const CreateAccount = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [createAccountSuccess, setCreateAccountSuccess] = useState(false);

    const createAccount = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setCreateAccountSuccess(true);
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
            });
    };

    const handleOnClose = () => {
        onClose();
        setCreateAccountSuccess(false);
    };

    return (
        <div className="create-account-container">
            {createAccountSuccess ? (
                <BabyDetails onClose={handleOnClose} />
            ) : (
                <form onSubmit={createAccount}>
                    <h1 style={{ textAlign: "center", fontSize: "20px", fontFamily: "Noto Sans Bengali" }}>Create an Account</h1>
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
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                        <button type="submit">Create Account</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default CreateAccount;
