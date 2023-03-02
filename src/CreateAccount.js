import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import AddBabyDetails from "./AddBabyDetails";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function CreateAccount({ onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [createAccountSuccess, setCreateAccountSuccess] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const db = getFirestore();
            const userId = userCredential.user.uid;
            const parentRef = `users/${userId}`;
            const babyDetails = {
                parent: parentRef
            };
            await addDoc(collection(db, "babies"), babyDetails);
            setCreateAccountSuccess(true);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    function handleOnClose() {
        onClose();
        setCreateAccountSuccess(false);
    }

    return (
        <div className="create-account-container">
            {createAccountSuccess ? (
                <AddBabyDetails onClose={handleOnClose} />
            ) : (
                <form onSubmit={handleSubmit}>
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
}

export default CreateAccount;
