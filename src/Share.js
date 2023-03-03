import { useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Share = ({ babyId }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleShareClick = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "babies"));
            const babyDetails = querySnapshot.docs.find((doc) => doc.id === babyId)?.data();

            if (!babyDetails) {
                setMessage("Error: Baby details not found.");
                return;
            }

            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                setMessage("Error: User not authenticated.");
                return;
            }

            const userDocRef = doc(collection(db, "users"), currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                setMessage("Error: User not found in database.");
                return;
            }

            const emailBody = `Name: ${babyDetails.name}\nHospital: ${babyDetails.hospital}\nDate of Birth: ${babyDetails.birth_date.toDate().toLocaleDateString()}\nWeight: ${babyDetails.weight}\nLength: ${babyDetails.length}\nHead Circumference: ${babyDetails.head_circumference}`;

            const mailtoLink = `mailto:${email}?subject=Baby%20Details&body=${emailBody}`;

            window.location.href = mailtoLink;

            setMessage("Email sent successfully.");
        } catch (error) {
            console.log("Error sharing birth details:", error);
            setMessage("Error sharing birth details.");
        }
    };

    return (
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
            <button onClick={handleShareClick}>Share</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Share;
