import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import './Immunisations.css';

function ImmunisationsData({ onClose, setShowImmunisations }) {
    const [isLoading, setIsLoading] = useState(true);
    const [immunisations, setImmunisations] = useState([]);
    const currentUserId = // get the current user's id here

        useEffect(() => {
            const babiesRef = collection(db, 'babies');
            const immunisationsRef = collection(db, 'immunisations');

            const fetchData = async () => {
                try {
                    const babiesSnapshot = await getDocs(babiesRef);
                    const babiesData = babiesSnapshot.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() };
                    });

                    const immunisationsSnapshot = await getDocs(immunisationsRef);
                    const immunisationsData = immunisationsSnapshot.docs.map((doc) => {
                        const baby = babiesData.find((b) => b.id === doc.id);
                        if (baby && baby.user_id === currentUserId) { // Add a check for the baby object
                            return { id: doc.id, immunisation: doc.data(), ...baby };
                        }
                    }).filter((immunisation) => immunisation != null);

                    setImmunisations(immunisationsData);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }, []);

    const handleCheckboxChange = async (immunisationId, type, item, isChecked) => {
        const immunisationsRef = doc(db, 'immunisations', immunisationId);
        const dataToUpdate = {
            [`${type}.${item}`]: isChecked
        };

        try {
            await updateDoc(immunisationsRef, dataToUpdate);
            console.log('Document updated successfully');

            setImmunisations(prevState => prevState.map(immunisation => {
                if (immunisation.id === immunisationId) {
                    return {
                        ...immunisation,
                        immunisation: {
                            ...immunisation.immunisation,
                            [type]: {
                                ...immunisation.immunisation[type],
                                [item]: isChecked
                            }
                        }
                    };
                }
                return immunisation;
            }));
        } catch (error) {
            console.error(error);
        }
    };

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
            {immunisations.map((immunisation) => (
                <div className='immun-scroll' key={immunisation.id}>
                    <h3>{immunisation.name}</h3>
                    <div>
                        <h4>Birth</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.birth.map((item) => (
                                <li key={item}>
                                    <div className="checkbox-container">
                                        <input type="checkbox" checked={immunisation.immunisation.birth[item]} onChange={(e) => handleCheckboxChange(immunisation.id, 'immunisation', `birth.${item}`, e.target.checked)} />
                                        <span>{item}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Two Months Old</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.two_months.map((item) => (
                                <li key={item}>
                                    <div className="checkbox-container">
                                        <input type="checkbox" checked={immunisation.immunisation.two_months[item]} onChange={(e) => handleCheckboxChange(immunisation.id, 'immunisation', `two_months.${item}`, e.target.checked)} />
                                        <span>{item}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Four Months</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.four_months.map((item) => (
                                <li key={item}>
                                    <div className="checkbox-container">
                                        <input type="checkbox" checked={immunisation.immunisation.four_months[item]} onChange={(e) => handleCheckboxChange(immunisation.id, 'immunisation', `four_months.${item}`, e.target.checked)} />
                                        <span>{item}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Six Months</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.six_months.map((item) => (
                                <li key={item}>
                                    <div className="checkbox-container">
                                        <input type="checkbox" checked={immunisation.immunisation.six_months[item]} onChange={(e) => handleCheckboxChange(immunisation.id, 'immunisation', `six_months.${item}`, e.target.checked)} />
                                        <span>{item}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Twelve Months</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.twelve_months.map((item) => (
                                <li key={item}>
                                    <div className="checkbox-container">
                                        <input type="checkbox" checked={immunisation.immunisation.twelve_months[item]} onChange={(e) => handleCheckboxChange(immunisation.id, 'immunisation', `twelve_months.${item}`, e.target.checked)} />
                                        <span>{item}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Eighteen Months</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.eighteen_months.map((item) => (
                                <li key={item}>
                                    <div className="checkbox-container">
                                        <input type="checkbox" checked={immunisation.immunisation.eighteen_months[item]} onChange={(e) => handleCheckboxChange(immunisation.id, 'immunisation', `eighteen_months.${item}`, e.target.checked)} />
                                        <span>{item}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Four Years</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.four_years.map((item) => (
                                <li key={item}>
                                    <div className="checkbox-container">
                                        <input type="checkbox" checked={immunisation.immunisation.four_years[item]} onChange={(e) => handleCheckboxChange(immunisation.id, 'immunisation', `four_years.${item}`, e.target.checked)} />
                                        <span>{item}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ImmunisationsData;