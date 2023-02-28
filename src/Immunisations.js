import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Immunisations.css';

function ImmunisationsData({ onClose }) {
    const [isLoading, setIsLoading] = useState(true);
    const [immunisations, setImmunisations] = useState([]);

    useEffect(() => {
        const babiesRef = collection(db, 'babies');
        const immunisationsRef = collection(db, 'immunisations');

        getDocs(babiesRef)
            .then((snapshot) => {
                const babiesData = snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });

                return getDocs(immunisationsRef)
                    .then((snapshot) => {
                        const immunisationsData = snapshot.docs.map((doc) => {
                            const baby = babiesData.find((b) => b.id === doc.id);
                            return { id: doc.id, immunisation: doc.data(), ...baby };
                        });

                        setImmunisations(immunisationsData);
                        setIsLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="popup-immunisations">
            <div className="popup-header-immunisations">
                <h1 className='title-immunisations'>Immunisations</h1>
                <button onClick={onClose}>X</button>
            </div>
            {immunisations.map((immunisation) => (
                <div className='immun-scroll' key={immunisation.id}>
                    <h3>{immunisation.name}</h3>
                    <div>
                        <h4>Birth</h4>
                        <ul className="no-bullets">
                            <li>
                                <input type="checkbox" />
                                {immunisation.immunisation.birth}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4>Two Months</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.two_months.map((item) => (
                                <li key={item}>
                                    <input type="checkbox" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Four Months</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.four_months.map((item) => (
                                <li key={item}>
                                    <input type="checkbox" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Six Months</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.six_months.map((item) => (
                                <li key={item}>
                                    <input type="checkbox" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Twelve Months</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.twelve_months.map((item) => (
                                <li key={item}>
                                    <input type="checkbox" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Eighteen Months</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.eighteen_months.map((item) => (
                                <li key={item}>
                                    <input type="checkbox" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Four Years</h4>
                        <ul className="no-bullets">
                            {immunisation.immunisation.four_years.map((item) => (
                                <li key={item}>
                                    <input type="checkbox" />
                                    {item}
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





