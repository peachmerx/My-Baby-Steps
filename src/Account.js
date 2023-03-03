import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import AddBabyDetails from './AddBabyDetails';
import "./Account.css";

function Account({ onClose }) {
    const [showAddBaby, setShowAddBaby] = useState(false);
    const [showBabies, setShowBabies] = useState(false);
    const [babies, setBabies] = useState([]);
    const [selectedBaby, setSelectedBaby] = useState(null);

    const handleAddBaby = () => {
        setShowAddBaby(true);
    }

    const handleAddBabySubmit = async (baby) => {
        try {
            const db = getFirestore();
            const userId = getAuth().currentUser.uid;
            const docRef = await addDoc(collection(db, `users/${userId}/children`), baby);
            console.log("Baby added with ID: ", docRef.id);
            setShowAddBaby(false);
            // Update the list of babies to include the new one
            setBabies([...babies, { id: docRef.id, ...baby }]);
        } catch (error) {
            console.error("Error adding baby: ", error);
        }
    };


    useEffect(() => {
        const fetchBabies = async () => {
            const db = getFirestore();
            const userId = getAuth().currentUser.uid;
            const q = query(collection(db, `users/${userId}/babies`));
            const querySnapshot = await getDocs(q);
            const babies = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setBabies(babies);
        };
        fetchBabies();
    }, []);

    return (
        <div className="popup-account">
            <h2 className="popup-header-account">Account</h2>
            <p><strong>Email:</strong> {getAuth().currentUser.email}</p>
            <div className="password">
                <p><strong>Password:</strong> ********</p>
                <button className='new-baby' onClick={handleAddBaby}>Add Baby</button>
                <button className='view-babies' onClick={() => setShowBabies(!showBabies)}>View Babies</button>
                <button className="close" onClick={onClose}>Close</button>
            </div>
            {showBabies && (
                <>
                    <h3>Babies:</h3>
                    <ul>
                        {babies.map((baby) => (
                            <li key={baby.id}>
                                <button onClick={() => setSelectedBaby(baby)}>{baby.name}</button>
                            </li>
                        ))}
                    </ul>
                    <p>Existing babies for {babies.map((baby) => baby.name).join(', ')}</p>

                </>
            )}

            {showAddBaby && <AddBabyDetails onSubmit={handleAddBabySubmit} onCancel={() => setShowAddBaby(false)} babies={babies} selectedBaby={selectedBaby} />}
            {selectedBaby && (
                <div>
                    <h3>{selectedBaby.name}</h3>
                    <p>Baby Profile goes here</p>
                </div>
            )}
        </div>
    );
}

export default Account;
