import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setProfile(data))
      .catch(() => navigate("/login"));
  }, [token, navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const copyId = () => {
    if (profile?._id) {
      navigator.clipboard?.writeText(profile._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!profile) return (
    <div className="page-wrapper">
      <div className="container">
        <div className="auth-card">
          <p className="auth-footer">Chargement...</p>
        </div>
      </div>
    </div>
  );

  const initials = (profile.name || "").split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase() || "?";

  return (
    <div className="page-wrapper">
      <div className="container profile-container">
        <div className="profile-frame">
          <div className="profile-header">
            <div className="profile-summary">
              <div className="profile-avatar">{initials}</div>
              <div className="profile-meta">
                <h1 className="profile-name">{profile.name}</h1>
                <p className="profile-email">→ {profile.email}</p>
                <p className="profile-hint"> 🤍 Votre espace personnel.</p>
              </div>
            </div>

            <div className="profile-actions header-actions">
              <button className="btn-icon" onClick={() => navigate('/dashboard')}>Retour</button>
              <button className="btn-icon" onClick={copyId}>Copier l'ID</button>
              <button className="btn-icon" onClick={logout}>Déconnexion</button>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-card-title">Détails du compte</div>

            <div className="profile-detail-grid">
              <div className="detail-item">
                <span className="label">Membre depuis</span>
                <span className="value">{new Date(profile.createdAt).toLocaleDateString("fr-FR")}</span>
              </div>
              <div className="detail-item">
                <span className="label">Identifiant</span>
                <span className="value">{profile._id}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email</span>
                <span className="value">{profile.email}</span>
              </div>
            </div>

            {copied && <p className="copy-note">Identifiant copié !</p>}
          </div>
        </div>
      </div>
    </div>
  );
}