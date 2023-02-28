import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./BirthDetails.css";

const BirthDetails = ({ onClose }) => {
    const [birthDetails, setBirthDetails] = useState({});

    useEffect(() => {
        const fetchBirthDetails = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "babies"));
                const babyDetails = querySnapshot.docs[0].data();
                setBirthDetails({
                    birthDate: babyDetails.birth_date,
                    headCircumference: babyDetails.head_circumference,
                    hospital: babyDetails.hospital,
                    length: babyDetails.length,
                    name: babyDetails.name,
                    weight: babyDetails.weight
                });
            } catch (error) {
                console.log("Error fetching birth details:", error);
            }
        };
        fetchBirthDetails();
    }, [birthDetails]); // Add birthDetails as a dependency

    return (
        <div className="birth-details">
            <div className="header">
                <h2>Birth Details</h2>
                <button className="close-button" onClick={onClose}>
                    X
                </button>
            </div>
            <div className="details">
                <p>
                    <strong>Name:</strong> {birthDetails.name}
                </p>
                <p>
                    <strong>Birth Date:</strong> {birthDetails.birthDate}
                </p>
                <p>
                    <strong>Weight:</strong> {birthDetails.weight}g
                </p>
                <p>
                    <strong>Length:</strong> {birthDetails.length}cm
                </p>
                <p>
                    <strong>Head Circumference:</strong> {birthDetails.headCircumference}cm
                </p>
                <p>
                    <strong>Hospital:</strong> {birthDetails.hospital}
                </p>
            </div>
        </div>
    );
};

export default BirthDetails;
