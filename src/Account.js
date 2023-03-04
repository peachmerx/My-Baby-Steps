import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc, onSnapshot, setDoc } from "firebase/firestore";

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
            setBabies([...babies, { id: docRef.id, ...baby }]);
        } catch (error) {
            console.error("Error adding baby: ", error);
        }
    };

    const handleDeleteBaby = async (id) => {
        try {
            const db = getFirestore();
            const userId = getAuth().currentUser.uid;
            await deleteDoc(doc(db, `users/${userId}/babies/${id}`));
            setBabies(babies.filter((baby) => baby.id !== id));
            setSelectedBaby(null);
        } catch (error) {
            console.error("Error deleting baby: ", error);
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

    useEffect(() => {
        const fetchChildName = async () => {
            if (selectedBaby) {
                const db = getFirestore();
                const userId = getAuth().currentUser.uid;
                const q = query(collection(db, `users/${userId}/children`), where("childId", "==", selectedBaby.id));
                const querySnapshot = await getDocs(q);
                const child = querySnapshot.docs[0].data();
                setSelectedBaby({ ...selectedBaby, childName: child.name });
            }
        };
        fetchChildName();
    }, [selectedBaby]);

    return (
        <div className="popup-account">
            <h2 className="popup-header-account">Account</h2>
            <p><strong>Email:</strong> {getAuth().currentUser.email}</p>
            <div className="password">
                <p><strong>Password:</strong> ********</p>
                <button className='new-baby' onClick={handleAddBaby}>Add Baby</button>
                <button className="close" onClick={onClose}>Close</button>
            </div>
            {showBabies && (
                <>
                    <h3></h3>
                    <ul>
                        {babies.map((baby) => (
                            <li key={baby.id}>
                                <button onClick={() => setSelectedBaby(baby)}>{baby.name}</button>
                                    <button onClick={() => handleDeleteBaby(baby.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <p>Little Bub: {babies.map((baby) => <button key={baby.id} onClick={() => setSelectedBaby(baby)}>{baby.name}</button>)}</p>
                </>
            )}

            {showAddBaby && <AddBabyDetails onSubmit={handleAddBabySubmit} onCancel={() => setShowAddBaby(false)} babies={babies} selectedBaby={selectedBaby} />}
            {selectedBaby && (
                <div>
                    <h3>{selectedBaby.name}</h3>
                    <p>Child name: {selectedBaby.childName}</p>
                </div>
            )}
        </div>
    );
}

export default Account;
