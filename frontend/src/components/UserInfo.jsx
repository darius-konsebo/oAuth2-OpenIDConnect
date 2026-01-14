import { useAuth } from "../auth/AuthProvider";

export default function UserInfo() {
    const { tokenParsed, keycloak } = useAuth();

    if (!tokenParsed) return null;

    return (
        <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <p>
                👤 <strong>{tokenParsed.given_name} {tokenParsed.family_name}</strong><br />
                📧 {tokenParsed.email}<br />
                🛡 Role(s): {tokenParsed.realm_access.roles.join(", ")}
            </p>
            <button onClick={() => keycloak.logout()}>Logout</button>
        </div>
    );
}
