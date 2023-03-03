import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { getDatabase, ref, set } from "firebase/database";
import { auth } from './firebase';
import './Immunisations.css';

function ImmunisationsData({ onClose, setShowImmunisations, childDoc, handleCheckboxChange }) {
    const [immunisations, setImmunisations] = useState({});
    const [ages, setAges] = useState([
        'birth',
        'two_months',
        'four_months',
        'six_months',
        'twelve_months',
        'eighteen_months',
        'four_years'
    ]);

    useEffect(() => {
        if (childDoc) {
            fetchImmunisations(childDoc.id);
        }
    }, [childDoc]);

    async function fetchImmunisations(childId) {
        const userId = auth.currentUser.uid;
        const childRef = doc(db, `users/${userId}/children/${childId}`);
        const immunisationsRef = doc(childRef, 'baby_details', 'immunisations');

        onSnapshot(immunisationsRef, (doc) => {
            if (doc.exists()) {
                const vaccines = doc.data();

                const allImmunisations = ages.reduce((acc, age) => {
                    acc[age] = vaccines[age] ? vaccines[age] : [];
                    return acc;
                }, {});

                setImmunisations(allImmunisations);
            } else {
                console.log("No immunisations data found for this child.");
            }
        }, (error) => {
            console.error(error);
        });
    }

    return (
        <div className="popup-immunisations">
            <div className="popup-header-immunisations">
                <h1 className='title-immunisations'>Immunisations</h1>
                <div>
                    <button className='close-immunisations' onClick={() => {
                        setShowImmunisations(false);
                        onClose();
                    }}>X</button>
                </div>
            </div>
            <form>
                {ages.map((age) => (
                    <div key={age}>
                        <div>{age}</div>
                        {immunisations[age].map((object, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={`${age}-${index}`}
                                        checked={object.checked}
                                        onChange={(e) => handleCheckboxChange(e, age, index)}
                                    />
                                    {object.vaccine}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </form>
        </div>
    );
}

export default ImmunisationsData;
