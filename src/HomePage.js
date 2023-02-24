import { useState } from 'react';
import './HomePage.css';
import mumandbub from './images/mumandbub.png';

function HomePage() {
    const [showPopup, setShowPopup] = useState(true);

    const closePopup = () => {
        setShowPopup(false);
    };
    return (
        <div className="home-page">
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h1>Peach Mercader</h1>
                        <p>
                            Hello there! I'm excited to introduce to you this demo app that I created as part of my General Assembly project. It's a platform that showcases my design and development capabilities, which I'm eager to demonstrate in my portfolio. I hope you enjoy browsing through the app, and thank you for visiting!
                        </p>
                        <button className="close" onClick={closePopup}>
                            X
                        </button>
                    </div>
                </div>
            )}
            <img src={mumandbub} alt="Mum and Baby Photo" height="380" />
            <h1 className="title">My Baby Steps</h1>
            <div className="info">
                <p>The essential app for Mums to effortlessly track and manage their baby's birth details and immunisation records.</p>
            </div>
            <div className="buttons">
                <button className="login">Log In</button>
                <button className="create-account">Create Account</button>
            </div>
            <div className="icons">
                <a href="https://github.com/your-account">
                    <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/your-account/">
                    <i className="fab fa-linkedin"></i>
                </a>
            </div>
        </div>
    );
}

export default HomePage;
