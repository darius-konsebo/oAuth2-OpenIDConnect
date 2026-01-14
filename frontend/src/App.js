import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Courses from "./components/Courses";
import AdminPanel from "./components/AdminPanel";
import ProtectedRouteAdmin from "./auth/ProtectedRouteAdmin";
import UserInfo from "./components/UserInfo";

function App() {
    return (
        <Router>
            <div>
                {/* Affiche le profil et bouton logout */}
                <UserInfo />

                <Routes>
                    <Route path="/" element={<Courses />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRouteAdmin>
                                <AdminPanel />
                            </ProtectedRouteAdmin>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
