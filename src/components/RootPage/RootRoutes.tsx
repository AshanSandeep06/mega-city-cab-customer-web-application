import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Home } from "../../screens/Home/HomeScreen";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Logout from "../Logout/Logout";

const RootRoutes = () => {
    return <AppRoutes />;
};

const AppRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isTokenExpired = (token: string | null) => {
        if (!token) return true;

        try {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Invalid token:", error);
            return true;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("customer_token");
        console.log("TOKEN: ", token)

        if (!token || isTokenExpired(token)) {
            navigate("/login");
        } else {
            if (location.pathname === "/" || location.pathname === "/login") {
                navigate("/dashboard");
            }
        }
    }, [navigate, location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            {/*<Route path="/login" element={<LoginPage />} />*/}
            {/*<Route path="/register" element={<Register />} />*/}
            {/*<Route path="/vehicle" element={<CarList />} />*/}
            {/*<Route path="/history" element={<ReservationHistory />} />*/}
            <Route path="/logout" element={<Logout />} />
        </Routes>
    );
};

export default RootRoutes;
