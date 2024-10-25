import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const user = useSelector(state => state.user.status);    
    return user?<Outlet/>:<Navigate to='yourposts' />
};


export default PrivateRoute;