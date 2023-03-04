import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

function ImmunisationsData() {
    const [immunisationData, setImmunisationData] = useState(null);

    // const userId = "gGO7OvCLuHRrIwaG3q9loH8KV443";
    // const childId = "x7XGtVpnPmC9hX79iUkJ";

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
                                console.log(babyDetails);
                                // setBabyName(babyDetails.baby_name);
                                // setDateOfBirth(babyDetails.birth_date);
                                // setBirthDetails({
                                //     hospital: babyDetails.hospital,
                                //     birth_date: babyDetails.birth_date,
                                //     weight: babyDetails.weight,
                                //     length: babyDetails.length,
                                //     head_circumference: babyDetails.head_circumference,
                                //     baby_name: babyDetails.baby_name
                                
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

    // /users/${userId}/children/{childId}/baby_details/immunisations/birth
    // users/${userId}/children/${childId}/baby_details/birth_details
    // useEffect(() => {
    //     const fetchAllImmunisationData = async () => {
    //         console.log('im here---------')
    //         try {
    //             const immunisationsRef = doc(db, `users/${userId}/children/${childId}/baby_details/immunisations`);
    //             const immunisationsSnapshot = await getDoc(immunisationsRef);
    //             const immunisationsData = immunisationsSnapshot.data();
    //             const allImmunisationData = {};
    //             console.log(immunisationsData)
    //             for (const age in immunisationsData) {
    //                 const vaccines = immunisationsData[age];
    //                 for (const vaccine in vaccines) {
    //                     const immunisationId = Object.keys(vaccines).find((key) => vaccines[key].name === vaccine);
    //                     const immunisationRef = doc(db, `users/${userId}/children/${childId}/baby_details/immunisations/${age}/${immunisationId}`);
    //                     const immunisationSnapshot = await getDoc(immunisationRef);
    //                     const immunisationData = immunisationSnapshot.data();
    //                     allImmunisationData[age] = allImmunisationData[age] || {};
    //                     allImmunisationData[age][vaccine] = immunisationData;

    //                     console.log(immunisationId);
    //                 }
    //             }

    //             setImmunisationData(allImmunisationData);
    //         } catch (error) {
    //             console.log("Error fetching immunisation data:", error);
    //         }
    //     };

    //     fetchAllImmunisationData();
    // }, []);


    // console.log('Immunisation Data:', immunisationData);

    // if (!immunisationData) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div>
            {/* {Object.entries(babyDetails).map(([age, vaccines]) => (
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
            ))} */}
        </div>
    );
}


export default ImmunisationsData;
