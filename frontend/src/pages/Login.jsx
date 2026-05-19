import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: undefined });
  };

  const validate = () => {
    const next = {};

    if (mode === "register" && !form.name.trim()) {
      next.name = "Le nom complet est requis.";
    }

    if (!form.email.trim()) {
      next.email = "L'email est requis.";
    } else if (!emailRegex.test(form.email)) {
      next.email = "L'email n'est pas valide.";
    }

    if (!form.password) {
      next.password = "Le mot de passe est requis.";
    } else if (form.password.length < 6) {
      next.password = "Au moins 6 caractères requis.";
    }

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    try {
      setError("");
      if (!validate()) {
        setError("Veuillez corriger les champs en rouge.");
        return;
      }

      const endpoint = mode === "login" ? `${API}/api/users/login` : `${API}/api/users/register`;
      const payload = mode === "register" ? { name: form.name, email: form.email, password: form.password } : { email: form.email, password: form.password };
      const { data } = await axios.post(endpoint, payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message;
      setError(message || "Erreur de connexion. Veuillez vérifier vos informations.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="auth-card">
          <div className="card-decor" aria-hidden="true" />
          <h2 className="card-title">{mode === "login" ? "Connexion" : "Inscription"}</h2>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {mode === "register" && (
              <>
                <input
                  className={`form-input${fieldErrors.name ? " error" : ""}`}
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.name}
                />
                {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}
              </>
            )}

            <input
              className={`form-input${fieldErrors.email ? " error" : ""}`}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}

            <input
              className={`form-input${fieldErrors.password ? " error" : ""}`}
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.password}
            />
            {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" className="btn-primary-custom">{mode === "login" ? "Se connecter" : "S'inscrire"}</button>
          </form>

          <p className="auth-footer">
            <span className="auth-link" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setFieldErrors({}); }}>
              {mode === "login" ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}