import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import PageNotFound from "../pages/pageNotFound";
import { ProtectedRoutes, PublicRoutes } from './protectedRoutes';
import Home from '../../src/pages/home';
import About from '../../src/pages/about';
import Psychiatrist from '../../src/pages/psychiatrist';

const publicRoutes = [
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
];

const privateRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/about-us',
        element: <About />,
    },
    {
        path: '/psychiatrist',
        element: <Psychiatrist />,
    }
];

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<PublicRoutes />} >
                    {publicRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                </Route> */}

                {/* <Route path="/" element={<ProtectedRoutes />}> */}
                <Route path="/">
                    {privateRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;