import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setUsers(data))
      .catch(() => {});
  }, [token]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-nav">
        <span className="nav-user">Dashboard — Bonjour, {user.name}</span>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-danger-custom" onClick={() => navigate("/profile")}>Profil</button>
          <button className="btn-danger-custom" onClick={logout}>Déconnexion</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header-grid">
          <div>
            <h3 className="dashboard-title">Utilisateurs enregistrés</h3>
            <p className="dashboard-subtitle">→ Liste des utilisateurs inscrits.</p>
          </div>
          <div className="dashboard-count">Total : {users.length}</div>
        </div>

        <div className="info-card">
          <table className="info-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Créé le</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="empty-state">Aucun utilisateur trouvé.</td>
                </tr>
              ) : users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}