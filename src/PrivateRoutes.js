import { Outlet, Navigate } from 'react-router-dom';
import { auth } from './firebase';

const PrivateRoutes = () => {
    const isLoggedIn = auth.currentUser;

    return isLoggedIn ? <Navigate to="/baby-profile" replace={true} /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoutes;
