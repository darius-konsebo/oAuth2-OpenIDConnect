import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { createApi } from "../services/api";

export default function Courses() {
    const { token } = useAuth();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const api = createApi(token);

        api.get("/courses")
            .then(res => setCourses(res.data))
            .catch(err => setError(err.response?.status || err.message));
    }, [token]);

    if (error) return <div>Erreur accès cours: {error}</div>;

    return (
        <div>
            <h2>Cours disponibles</h2>
            <ul>
                {courses.map((c, index) => (
                    <li key={index}>{c}</li>
                ))}
            </ul>
        </div>
    );
}
