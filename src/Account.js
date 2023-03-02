import { getAuth } from 'firebase/auth';
import "./Account.css";

const Account = ({ onClose }) => {
    const handleAddBaby = () => {
        // Add code to add a new baby
    }

    return (
        <div className="popup-account">
            <h2 className="popup-header-account">Account</h2>
            <p><strong>Email:</strong> {getAuth().currentUser.email}</p>
            <div className="password-change">
                <p><strong>Password:</strong> ********</p>
                <button className='new-baby' onClick={handleAddBaby}>Add Baby</button>
                <button className="close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Account;
