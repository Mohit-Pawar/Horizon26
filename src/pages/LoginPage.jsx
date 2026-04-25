// src/pages/LoginPage.jsx
// Replace your current LoginPage.jsx fully

import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const { dispatch } = useApp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = users.find(
      (u) =>
        u.email.toLowerCase() ===
          form.email.toLowerCase() &&
        u.password === form.password
    );

    if (!user) {
      setError(
        "Invalid email or password"
      );
      return;
    }

    /* Save session */
    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    /* IMPORTANT: login state true */
    dispatch({
      type: "LOGIN_SUCCESS",
      user,
    });

    /* IMPORTANT: go feed page */
    dispatch({
      type: "SET_PAGE",
      page: "feed",
    });
  };

  return (
    <div style={wrap}>
      <div style={card}>
        <h1 style={title}>
          Login
        </h1>

        <p style={sub}>
          Welcome back to CivicSense
        </p>

        {error && (
          <div style={errorBox}>
            {error}
          </div>
        )}

        <form
          onSubmit={submitLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
            style={input}
          />

          <button
            type="submit"
            style={btn}
          >
            Login
          </button>
        </form>

        <div style={bottom}>
          No account?
          <span
            style={link}
            onClick={() =>
              dispatch({
                type: "SET_PAGE",
                page: "signup",
              })
            }
          >
            {" "}
            Signup
          </span>
        </div>
      </div>
    </div>
  );
}

/* styles */
const wrap = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(135deg,#0a0d0f,#111418,#0f172a)",
};

const card = {
  width: 420,
  background: "#111418",
  border:
    "1px solid rgba(255,255,255,0.08)",
  borderRadius: 22,
  padding: 34,
};

const title = {
  fontSize: 34,
  color: "#fff",
  fontWeight: 800,
};

const sub = {
  color: "#94a3b8",
  marginTop: 8,
  marginBottom: 24,
};

const input = {
  height: 54,
  borderRadius: 14,
  border:
    "1px solid rgba(255,255,255,0.08)",
  background: "#181d22",
  padding: "0 16px",
  color: "#fff",
};

const btn = {
  height: 54,
  border: "none",
  borderRadius: 14,
  background:
    "linear-gradient(135deg,#16a34a,#22c55e)",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const errorBox = {
  background:
    "rgba(239,68,68,0.12)",
  color: "#ef4444",
  padding: 12,
  borderRadius: 12,
  marginBottom: 14,
};

const bottom = {
  marginTop: 18,
  color: "#94a3b8",
};

const link = {
  color: "#22c55e",
  fontWeight: 700,
  cursor: "pointer",
};