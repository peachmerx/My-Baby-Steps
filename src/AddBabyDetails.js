import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function AddBabyDetails({ onClose, userId }) {
    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        hospital: "",
        weight: "",
        length: "",
        headCircumference: "",
    });
    const [error, setError] = useState("");

    async function addBabyDetails() {
        const db = getFirestore();

        try {
            const userRef = await addDoc(collection(db, "users"), { parent: "users" });
            const userId = userRef.id;

            await addDoc(collection(db, `users/${userId}/children`), formData);
            onClose();
        } catch (error) {
            console.error("Error adding baby details: ", error);
            setError("Error adding baby details: " + error.message);
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleAddBabyDetails(e) {
        e.preventDefault();
        addBabyDetails();
    }

    return (
        <div className="popup-baby-details">
            <h2 className="popup-header-baby-details">Baby Details</h2>
            <form onSubmit={handleAddBabyDetails}>
                <label htmlFor="baby_name">Baby Name:</label>
                <input type="text" id="baby_name" name="baby_name" value={formData.name} onChange={handleInputChange} />

                <label htmlFor="birth_date">Birth Date:</label>
                <input type="date" id="birth_date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} />

                <label htmlFor="hospital">Hospital:</label>
                <input type="text" id="hospital" name="hospital" value={formData.hospital} onChange={handleInputChange} />

                <label htmlFor="weight">Weight:</label>
                <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} />

                <label htmlFor="length">Length:</label>
                <input type="text" id="length" name="length" value={formData.length} onChange={handleInputChange} />

                <label htmlFor="head_circumference">Head Circumference:</label>
                <input type="text" id="head_circumference" name="headCircumference" value={formData.headCircumference} onChange={handleInputChange} />

                <div className="button-group">
                    <button type="submit">Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default AddBabyDetails;
