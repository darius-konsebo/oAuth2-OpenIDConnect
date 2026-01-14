import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { createApi } from "../services/api";

const AdminPanel = () => {
    const { token } = useAuth();
    const api = createApi(token?.token);

    const [course, setCourse] = useState("");

    const addCourse = () => {
        api.post("/courses", { title: course })
            .then(() => alert("Cours ajouté"))
            .catch(err => alert("Accès interdit"));
    };

    return (
        <div>
            <h2>🛠 Gestion des cours (ADMIN)</h2>
            <input
                type="text"
                placeholder="Nom du cours"
                value={course}
                onChange={e => setCourse(e.target.value)}
            />
            <button onClick={addCourse}>Ajouter</button>
        </div>
    );
};

export default AdminPanel;
