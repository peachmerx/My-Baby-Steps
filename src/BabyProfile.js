import { useState, useEffect } from "react";
import Immunisations from "./Immunisations";
import { db } from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import mumandbub from "./images/mumandbub.png";
import "./BabyProfile.css";

const BabyProfile = () => {
    const [babyName, setBabyName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [babyAge, setBabyAge] = useState("");
    const [isSignedOut, setIsSignedOut] = useState(false);
    const [showBirthDetails, setShowBirthDetails] = useState(false);
    const [birthDetails, setBirthDetails] = useState({});
    const [showImmunisations, setShowImmunisations] = useState(false);
    const [immunisations, setImmunisations] = useState({});

    useEffect(() => {
        const fetchBabyDetails = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "babies"));
                const babyDetails = querySnapshot.docs[0].data();
                setBabyName(babyDetails.name);
                setDateOfBirth(babyDetails.birth_date);
                setBirthDetails({
                    hospital: babyDetails.hospital,
                    birth_date: babyDetails.birth_date,
                    weight: babyDetails.weight,
                    length: babyDetails.length,
                    head_circumference: babyDetails.head_circumference,
                    name: babyDetails.name
                });
            } catch (error) {
                console.log("Error fetching baby details:", error);
            }
        };
        fetchBabyDetails();
    }, []);

    useEffect(() => {
        if (dateOfBirth) {
            const today = new Date();
            const dob = new Date(dateOfBirth.toDate()); // convert Firestore timestamp to JavaScript date
            let diff = today - dob;
            let age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            setBabyAge(`${age} Years Old`);
        } else {
            setBabyAge("");
        }
    }, [dateOfBirth]);

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setIsSignedOut(true);
            })
            .catch((error) => {
                console.log("Error signing out:", error);
            });
    };

    if (isSignedOut) {
        return <Navigate to="/" replace={true} />;
    }

    const toggleBirthDetails = () => {
        setShowBirthDetails(!showBirthDetails);
    };

    const toggleImmunisations = () => {
        setShowImmunisations(!showImmunisations);
    };

    const formattedBirthDate = birthDetails.birth_date && birthDetails.birth_date.toDate().toLocaleDateString();

    return (
        <div className="baby-profile">
            <div className="header">
                <button className="nav-button">MENU</button>
                <img className="image-logo" src={mumandbub} alt="Mum and Baby Outline Drawing" height="60" />
                <h1 className="title_profile">My Baby Steps</h1>
            </div>
            <div className="content">
                <div className="baby-info">
                    <div className="baby-icon">
                        <i className="fas fa-baby"></i>
                    </div>
                    <div className="baby-details">
                        <h2 className="baby-name">{babyName}</h2>
                        <p className="baby-age">{babyAge}</p>
                    </div>
                </div>
                <div className="buttons">
                    <button className="birth-details" onClick={toggleBirthDetails}>
                        Birth Details
                    </button>
                    <button className="immunisations" onClick={toggleImmunisations}>Immunisations</button>
                </div>
            </div>
            <footer className="footer">
                <div className="social-icons">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </footer>
            {showBirthDetails && (
                <div className="popup">
                    <div className="popup-content-birth-details">
                        <button className="close" onClick={toggleBirthDetails}>
                            X
                        </button>
                        <h2 className="b-details-pop">Birth Details</h2>
                        <div className="birthdetails-container">
                            <div className="birth-details-left">
                                <div className="baby-name">
                                    <p><strong>Name:</strong> {birthDetails.name}</p>
                                </div>
                                <p><strong>Name of Hospital:</strong> {birthDetails.hospital}</p>
                                <p><strong>Date of Birth:</strong> {formattedBirthDate}</p>
                            </div>
                            <div className="birth-details-right">
                                <p><strong>Weight:</strong> {birthDetails.weight}</p>
                                <p><strong>Length:</strong> {birthDetails.length}</p>
                                <p><strong>Head Circumference:</strong> {birthDetails.head_circumference}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showImmunisations && (
                <Immunisations showImmunisations={showImmunisations} toggleImmunisations={toggleImmunisations} />
            )}

        </div>
    );
};

export default BabyProfile;
