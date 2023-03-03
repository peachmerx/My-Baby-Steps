import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function ImmunisationsData() {
    const [immunisationData, setImmunisationData] = useState(null);

    const userId = "gGO7OvCLuHRrIwaG3q9loH8KV443";
    const childId = "x7XGtVpnPmC9hX79iUkJ";

    useEffect(() => {
        const fetchAllImmunisationData = async () => {
            try {
                const immunisationsRef = doc(db, `users/${userId}/children/${childId}/baby_details/immunisations`);
                const immunisationsSnapshot = await getDoc(immunisationsRef);
                const immunisationsData = immunisationsSnapshot.data();
                const allImmunisationData = {};

                for (const age in immunisationsData) {
                    const vaccines = immunisationsData[age];
                    for (const vaccine in vaccines) {
                        const immunisationId = Object.keys(vaccines).find((key) => vaccines[key].name === vaccine);
                        const immunisationRef = doc(db, `users/${userId}/children/${childId}/baby_details/immunisations/${age}/${immunisationId}`);
                        const immunisationSnapshot = await getDoc(immunisationRef);
                        const immunisationData = immunisationSnapshot.data();
                        allImmunisationData[age] = allImmunisationData[age] || {};
                        allImmunisationData[age][vaccine] = immunisationData;

                        console.log(immunisationId);
                    }
                }

                setImmunisationData(allImmunisationData);
            } catch (error) {
                console.log("Error fetching immunisation data:", error);
            }
        };

        fetchAllImmunisationData();
    }, []);


    console.log('Immunisation Data:', immunisationData);

    if (!immunisationData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {Object.entries(immunisationData).map(([age, vaccines]) => (
                <div key={age}>
                    <h3>{age}</h3>
                    {Object.entries(vaccines).map(([vaccine, data]) => (
                        <div key={vaccine}>
                            <h4>{vaccine}</h4>
                            <ul className="no-bullets">
                                {Object.entries(data).map(([key, value]) => (
                                    <li key={key}>
                                        <span>{key}: </span>
                                        <span>{JSON.stringify(value)}</span>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}


export default ImmunisationsData;
