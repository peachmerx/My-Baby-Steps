import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Immunisations.css";

function ImmunisationsData() {
    const [immunisationsData, setImmunisationsData] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchImmunisationsDetails = async () => {
                    try {
                        const userId = user.uid;
                        const childrenRef = collection(db, `users/${userId}/children`);
                        const querySnapshot = await getDocs(childrenRef);

                        const immunisationsData = {};
                        await Promise.all(querySnapshot.docs.map(async (childDoc) => {
                            const childId = childDoc.id;
                            const immunisationsRef = doc(db, `users/${userId}/children/${childId}/baby_details/immunisations`);
                            const immunisationsSnapshot = await getDoc(immunisationsRef);
                            const immunisations = immunisationsSnapshot.data();

                            if (immunisations) {
                                for (const age in immunisations) {
                                    const vaccines = immunisations[age];
                                    for (const vaccine in vaccines) {
                                        const immunisationData = vaccines[vaccine];
                                        immunisationsData[age] = immunisationsData[age] || {};
                                        immunisationsData[age][vaccine] = immunisationData;
                                    }
                                }
                            }
                        }));
                        console.log(immunisationsData)
                        setImmunisationsData(immunisationsData);
                    } catch (error) {
                        console.log("Error fetching immunisations details:", error);
                    }
                };
                fetchImmunisationsDetails();
            }
        });
        return () => unsubscribe();
    }, []);

    const orderedAges = ['birth', 'two_months', 'four_months', 'six_months', 'twelve_months', 'eighteen_months', 'four_years'];

    return (
        <div className='popup-immunisations'>
            <div>
                <p className='title-immunisations'>IMMUNISATIONS</p>
            </div>
            <div className='popup-content-immunisations'>
                {immunisationsData && (
                    <ul>
                        {orderedAges.map((age) => (
                            <li key={age}>
                                {immunisationsData[age] && (
                                    <div>
                                        <h3>{age}</h3>
                                        <ul>
                                            {Object.entries(immunisationsData[age]).map(([vaccine, data]) => (
                                                <li key={vaccine}>
                                                    <input type="checkbox" checked={data.completed} />
                                                    <label>{data}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ImmunisationsData;
