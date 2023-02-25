import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const BabyDetails = ({ onClose, userId }) => {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [hospital, setHospital] = useState("");
    const [timeOfBirth, setTimeOfBirth] = useState("");
    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const babyDetails = {
            name,
            dateOfBirth,
            hospital,
            timeOfBirth,
            weight,
            length,
            headCircumference,
            userId,
        };
        try {
            const docRef = await addDoc(collection(db, "babyDetails"), babyDetails);
            console.log("Baby details added with ID: ", docRef.id);
            onClose();
        } catch (e) {
            console.error("Error adding baby details: ", e);
        }
    };

    return (
        <div className="baby-details-container">
            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center", fontSize: '20px', fontFamily: 'Noto Sans Bengali' }}>Enter Baby Details</h1>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Date of Birth (DD/MM/YYYY)"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Hospital"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Time of Birth (HH:MM AM/PM)"
                    value={timeOfBirth}
                    onChange={(e) => setTimeOfBirth(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Weight (grams)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Length (cm)"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Head Circumference (cm)"
                    value={headCircumference}
                    onChange={(e) => setHeadCircumference(e.target.value)}
                />
                <button type="submit">Save Details</button>
            </form>
        </div>
    );
};

export default BabyDetails;
