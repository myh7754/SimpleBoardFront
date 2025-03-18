import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from '../utils/AuthContext';

const ProtectedRoute = () => {
    const {isAuthenticated, isLoading} = useAuth();
    
    if(isLoading) {
        return <div>로딩 중 ...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to ="/login"/>;

};

export default ProtectedRoute;