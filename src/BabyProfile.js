import { useState, useEffect } from "react";
import ImmunisationsData from './Immunisations';
import TodoList from './ToDo';
import Account from './Account';
import { db } from "./firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import mumandbub from "./images/mumandbub.png";
import "./BabyProfile.css";

function BabyProfile() {
    const [babyName, setBabyName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [babyAge, setBabyAge] = useState("");
    const [isSignedOut, setIsSignedOut] = useState(false);
    const [showBirthDetails, setShowBirthDetails] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [birthDetails, setBirthDetails] = useState({});
    const [showImmunisations, setShowImmunisations] = useState(false);
    const [immunisations, setImmunisations] = useState({});
    const [showToDo, setShowToDo] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    // const [isEditingBirthDetails, setIsEditingBirthDetails] = useState(false);
    // const [editedBirthDetails, setEditedBirthDetails] = useState({
    //     hospital: "",
    //     birth_date: null,
    //     weight: "",
    //     length: "",
    //     head_circumference: "",
    //     name: "",
    // });

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchBabyDetails = async () => {
                    try {
                        const userId = user.uid;
                        const childrenRef = collection(db, `users/${userId}/children`);
                        const querySnapshot = await getDocs(childrenRef);

                        await Promise.all(querySnapshot.docs.map(async (childDoc) => {
                            const childId = childDoc.id;
                            const babyDetailsRef = doc(db, `users/${userId}/children/${childId}/baby_details/birth_details`);
                            const babyDetailsSnapshot = await getDoc(babyDetailsRef);
                            const babyDetails = babyDetailsSnapshot.data();
                            if (babyDetails) {
                                setBabyName(babyDetails.baby_name);
                                setDateOfBirth(babyDetails.birth_date);
                                setBirthDetails({
                                    hospital: babyDetails.hospital,
                                    birth_date: babyDetails.birth_date,
                                    weight: babyDetails.weight,
                                    length: babyDetails.length,
                                    head_circumference: babyDetails.head_circumference,
                                    baby_name: babyDetails.baby_name
                                });
                            }
                        }));
                    } catch (error) {
                        console.log("Error fetching baby details:", error);
                    }
                };
                fetchBabyDetails();
            }
        });
        return () => unsubscribe();
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

    const handleAccount = () => {
        setShowAccount(true);
        setShowBirthDetails(false);
        setShowImmunisations(false);
        setShowImmunisations(false);
        setShowToDo(false);
    };

    // const handleEditBirthDetails = () => {
    //     setIsEditingBirthDetails(true);
    //     setEditedBirthDetails(birthDetails);
    // };

    // const handleCancelEditBirthDetails = () => {
    //     setIsEditingBirthDetails(false);
    // };

    if (isSignedOut) {
        return <Navigate to="/" replace={true} />;
    }

    const toggleBirthDetails = () => {
        setShowBirthDetails(!showBirthDetails);
    };

    // const toggleShare = () => {
    //     setShowShare(!showShare);
    // };

    const toggleImmunisations = () => {
        setShowImmunisations(!showImmunisations);
    };

    const toggleToDo = () => {
        setShowToDo(!showToDo);
    };

    const formattedBirthDate = birthDetails.birth_date && birthDetails.birth_date.toDate().toLocaleDateString();

    return (
        <div className="baby-profile">
            <div className="header">
                <button className="nav-account" onClick={handleAccount}>Account</button>
                {showAccount && <Account onClose={() => setShowAccount(false)} />}
                <button className="nav-signout" onClick={handleSignOut}>Sign Out</button>
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
                    <button className="immunisations" onClick={toggleImmunisations}>
                        Immunisations
                    </button>
                    <button className="to-do" onClick={toggleToDo}>
                        To Do
                    </button>
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
                        {/* <button className="share" onClick={toggleShare}>Share</button> */}
                        <button className="close" onClick={toggleBirthDetails}>
                            X
                        </button>
                        <h2 className="b-details-pop">Birth Details</h2>
                        <div className="birthdetails-container">
                            <div className="birth-details-left">
                                <div className="baby-name">
                                    <p className="p-birthdetails"><strong>Name:</strong> {birthDetails.baby_name}</p>
                                </div>
                                <p className="p-birthdetails"><strong>Name of Hospital:</strong> {birthDetails.hospital}</p>
                                <p className="p-birthdetails"><strong>Date of Birth:</strong> {formattedBirthDate}</p>
                            </div>
                            <div className="birth-details-right">
                                <p className="p-birthdetails"><strong>Weight:</strong> {birthDetails.weight}</p>
                                <p className="p-birthdetails"><strong>Length:</strong> {birthDetails.length}</p>
                                <p className="p-birthdetails"><strong>Head Circumference:</strong> {birthDetails.head_circumference}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showImmunisations && (
                <ImmunisationsData onClose={() => setShowImmunisations(false)} setShowImmunisations={setShowImmunisations} />
            )}

            {showToDo && (
                <TodoList onClose={() => setShowToDo(false)} setShowToDo={setShowToDo} />
            )}  

        </div>
    );
}

export default BabyProfile;
