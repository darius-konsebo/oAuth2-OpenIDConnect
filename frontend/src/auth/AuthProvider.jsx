import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "./keycloak";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [initialized, setInitialized] = useState(false);
    const [token, setToken] = useState(null);
    const [tokenParsed, setTokenParsed] = useState(null);

    useEffect(() => {
        if (keycloak.authenticated || keycloak.token) {
            setToken(keycloak.token);
            setTokenParsed(keycloak.tokenParsed);
            setInitialized(true);
            return;
        }

        keycloak.init({ onLoad: "login-required", checkLoginIframe: false })
            .then(authenticated => {
                if (!authenticated) keycloak.login();
                else {
                    setToken(keycloak.token);
                    setTokenParsed(keycloak.tokenParsed);
                    setInitialized(true);
                }

                // renouvellement automatique du token toutes les 10s
                setInterval(() => {
                    keycloak.updateToken(30)
                        .then(newToken => setToken(newToken))
                        .catch(() => keycloak.logout());
                }, 10000);
            })
            .catch(err => console.error("Erreur Keycloak :", err));
    }, []);

    if (!initialized) return <div>Chargement du profil...</div>;

    return (
        <AuthContext.Provider value={{ token, tokenParsed, keycloak }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
