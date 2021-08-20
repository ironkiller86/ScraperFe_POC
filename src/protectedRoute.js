import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ children, ...routeProps }) => {
    const { auth } = routeProps;
    console.log('ProtectedRoute', auth);
    return (
        <Route {...routeProps}>
            {auth ? children : <Redirect to="/login" />}
        </Route>
    );
};

export default ProtectedRoute;
