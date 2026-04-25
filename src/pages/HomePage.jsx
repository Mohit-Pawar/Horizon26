// src/pages/HomePage.jsx

import React from "react";
import { useApp } from "../context/AppContext";

export default function HomePage() {
  const { dispatch } = useApp();

  const goTo = (page) => {
    dispatch({
      type: "SET_PAGE",
      page,
    });
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        background:
          "linear-gradient(180deg,#0a0d0f,#111418,#0a0d0f)",
        color: "#f1f5f9",
      }}
    >
      {/* Hero */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "90px 30px 70px",
          display: "grid",
          gridTemplateColumns:
            "1.2fr 1fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: "inline-block",
              padding:
                "8px 14px",
              borderRadius: 999,
              background:
                "rgba(34,197,94,0.10)",
              border:
                "1px solid rgba(34,197,94,0.20)",
              color: "#22c55e",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Empower Your City
          </div>

          <h1
            style={{
              fontSize: 58,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing:
                "-0.04em",
              marginBottom: 20,
            }}
          >
            Report Problems.
            <br />
            Improve Society.
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              color: "#94a3b8",
              maxWidth: 580,
              marginBottom: 32,
            }}
          >
            CivicSense helps citizens report potholes,
            garbage, street light failures, water issues
            and more — while earning rewards for helping
            the community.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() =>
                goTo("signup")
              }
              style={primaryBtn}
            >
              Get Started
            </button>

            <button
              onClick={() =>
                goTo("login")
              }
              style={ghostBtn}
            >
              Login
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 28,
              marginTop: 44,
              flexWrap: "wrap",
            }}
          >
            {[
              ["15K+", "Reports Raised"],
              ["9K+", "Resolved Issues"],
              ["120+", "Cities Connected"],
            ].map(([n, t]) => (
              <div key={t}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#22c55e",
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: 14,
                  }}
                >
                  {t}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            background:
              "linear-gradient(145deg,#111418,#181d22)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            padding: 26,
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 16,
            }}
          >
            {[
              {
                icon: "📍",
                title:
                  "Live Reporting",
                desc:
                  "Pin exact issue location instantly.",
              },
              {
                icon: "📷",
                title:
                  "Photo Evidence",
                desc:
                  "Upload photos for faster action.",
              },
              {
                icon: "🏆",
                title:
                  "Rewards System",
                desc:
                  "Earn points & benefits.",
              },
              {
                icon: "📊",
                title:
                  "Transparency",
                desc:
                  "Track issue progress publicly.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background:
                    "#0f1317",
                  border:
                    "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 18,
                  padding: 18,
                  display: "flex",
                  gap: 14,
                  alignItems:
                    "flex-start",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    display: "grid",
                    placeItems:
                      "center",
                    background:
                      "rgba(34,197,94,0.12)",
                    fontSize: 22,
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 16,
                      marginBottom: 6,
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      color:
                        "#94a3b8",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding:
            "0 30px 80px",
        }}
      >
        <h2
          style={{
            fontSize: 38,
            fontWeight: 900,
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          Why Choose CivicSense?
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            maxWidth: 700,
            margin:
              "0 auto 40px",
            lineHeight: 1.8,
          }}
        >
          Built for citizens who care about roads,
          cleanliness, safety and accountability.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: 18,
          }}
        >
          {[
            "Fast complaint registration",
            "Transparent issue tracking",
            "Local area heatmaps",
            "Government visibility",
            "Gamified civic engagement",
            "Modern mobile-friendly design",
          ].map((item) => (
            <div
              key={item}
              style={{
                background:
                  "#111418",
                border:
                  "1px solid rgba(255,255,255,0.07)",
                borderRadius: 22,
                padding: 22,
                fontWeight: 700,
              }}
            >
              ✅ {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const primaryBtn = {
  height: 52,
  padding: "0 28px",
  border: "none",
  borderRadius: 14,
  background:
    "linear-gradient(135deg,#16a34a,#22c55e)",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: 15,
};

const ghostBtn = {
  height: 52,
  padding: "0 28px",
  border:
    "1px solid rgba(255,255,255,0.10)",
  borderRadius: 14,
  background: "transparent",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 15,
};