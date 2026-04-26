// src/pages/SignupPage.jsx

import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function SignupPage() {
  const { dispatch } = useApp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  /* ---------- Validation ---------- */

  const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  };

  const validPassword = (password) => {
    // min 6 + one symbol
    return /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(
      password
    );
  };

  const submitSignup = (e) => {
    e.preventDefault();
    setError("");

    /* Name */
    if (!form.name.trim()) {
      setError("Enter full name");
      return;
    }

    /* Email */
    if (!validEmail(form.email)) {
      setError(
        "Enter valid email (example: mohit@gmail.com)"
      );
      return;
    }

    /* Password */
    if (!validPassword(form.password)) {
      setError(
        "Password must be 6+ characters and contain at least one symbol"
      );
      return;
    }

    /* Confirm Password */
    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    /* Existing Users */
    const users = JSON.parse(
      localStorage.getItem("users") ||
        "[]"
    );

    const exists = users.find(
      (u) =>
        u.email.toLowerCase() ===
        form.email.toLowerCase()
    );

    if (exists) {
      setError(
        "Account already exists with this email"
      );
      return;
    }

    /* Create User with Credits */
    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      credits: 100, // signup bonus
      joinedAt:
        new Date().toISOString(),
    };

    users.push(newUser);

    /* Save in Local Storage */
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(newUser)
    );

    /* Login Automatically */
    dispatch({
      type: "LOGIN_SUCCESS",
      user: newUser,
    });

    dispatch({
      type: "SET_PAGE",
      page: "feed",
    });
  };

  return (
    <div style={wrap}>
      {/* Left */}
      <div style={leftPanel}>
        <div style={badge}>
          Join Urban Eye
        </div>

        <h1 style={heroTitle}>
          Create Your Account
        </h1>

        <p style={heroText}>
          Report civic issues, earn credits,
          improve your city and become
          an active citizen.
        </p>

        <div style={featureBox}>
          <span>
            ✔ Get 100 Credits Signup Bonus
          </span>
          <span>
            ✔ Raise Complaints Instantly
          </span>
          <span>
            ✔ Earn Rewards Later
          </span>
        </div>
      </div>

      {/* Right */}
      <div style={card}>
        <h2 style={title}>
          Sign Up
        </h2>

        <p style={sub}>
          Start today for free
        </p>

        {error && (
          <div style={errorBox}>
            {error}
          </div>
        )}

        <form
          onSubmit={submitSignup}
          style={formStyle}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
            style={input}
          />

          <input
            type="text"
            placeholder="Email Address"
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

          <input
            type="password"
            placeholder="Confirm Password"
            value={
              form.confirmPassword
            }
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword:
                  e.target.value,
              })
            }
            style={input}
          />

          <button
            type="submit"
            style={btn}
          >
            Create Account
          </button>
        </form>

        <div style={bottomText}>
          Already have account?
          <span
            style={link}
            onClick={() =>
              dispatch({
                type: "SET_PAGE",
                page: "login",
              })
            }
          >
            {" "}
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

/* Styles */

const wrap = {
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns:
    "1fr 500px",
  background:
    "linear-gradient(135deg,#0a0d0f,#111418,#0f172a)",
};

const leftPanel = {
  padding: "80px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const badge = {
  color: "#22c55e",
  fontWeight: 700,
  marginBottom: 18,
};

const heroTitle = {
  fontSize: 52,
  lineHeight: 1.1,
  fontWeight: 900,
  color: "#fff",
  marginBottom: 18,
};

const heroText = {
  color: "#94a3b8",
  fontSize: 18,
  lineHeight: 1.8,
  maxWidth: 520,
  marginBottom: 30,
};

const featureBox = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  color: "#e2e8f0",
  fontSize: 15,
};

const card = {
  background: "#111418",
  borderLeft:
    "1px solid rgba(255,255,255,0.07)",
  padding: "55px 46px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const title = {
  fontSize: 34,
  fontWeight: 800,
  color: "#fff",
};

const sub = {
  color: "#94a3b8",
  marginTop: 8,
  marginBottom: 24,
};

const errorBox = {
  background:
    "rgba(239,68,68,0.12)",
  color: "#ef4444",
  padding: "12px 14px",
  borderRadius: 12,
  marginBottom: 16,
  fontSize: 14,
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const input = {
  height: 54,
  borderRadius: 14,
  border:
    "1px solid rgba(255,255,255,0.08)",
  background: "#181d22",
  padding: "0 18px",
  color: "#fff",
  fontSize: 14,
  outline: "none",
};

const btn = {
  height: 54,
  border: "none",
  borderRadius: 14,
  background:
    "linear-gradient(135deg,#16a34a,#22c55e)",
  color: "#fff",
  fontWeight: 800,
  fontSize: 15,
  cursor: "pointer",
};

const bottomText = {
  marginTop: 22,
  color: "#94a3b8",
  fontSize: 14,
};

const link = {
  color: "#22c55e",
  cursor: "pointer",
  fontWeight: 700,
};