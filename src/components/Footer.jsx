// src/components/Footer.jsx

import React from "react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { dispatch } = useApp();

  const goTo = (page) => {
    dispatch({
      type: "SET_PAGE",
      page,
    });
  };

  return (
    <footer
      style={{
        background: "#0b0f12",
        borderTop:
          "1px solid rgba(255,255,255,0.06)",
        marginTop: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 30px 26px",
        }}
      >
        {/* Top Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1.3fr 1fr 1fr 1fr",
            gap: 26,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#22c55e",
                marginBottom: 14,
              }}
            >
              CivicSense
            </div>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: 1.8,
                fontSize: 14,
                maxWidth: 320,
              }}
            >
              A smart civic platform helping citizens
              report issues, improve neighborhoods and
              create cleaner, safer communities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <Title text="Navigation" />

            <FooterLink
              text="Home"
              onClick={() => goTo("home")}
            />
            <FooterLink
              text="Login"
              onClick={() => goTo("login")}
            />
            <FooterLink
              text="Signup"
              onClick={() => goTo("signup")}
            />
          </div>

          {/* Platform */}
          <div>
            <Title text="Platform" />

            <FooterLink text="Issue Tracking" />
            <FooterLink text="Rewards System" />
            <FooterLink text="Community Feed" />
            <FooterLink text="Smart Reports" />
          </div>

          {/* Contact */}
          <div>
            <Title text="Contact" />

            <FooterLink text="support@civicsense.com" />
            <FooterLink text="+91 98765 43210" />
            <FooterLink text="Mumbai, India" />
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop:
              "1px solid rgba(255,255,255,0.06)",
            paddingTop: 20,
            display: "flex",
            justifyContent:
              "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              color: "#64748b",
              fontSize: 13,
            }}
          >
            © 2026 CivicSense. All rights reserved.
          </span>

          <div
            style={{
              display: "flex",
              gap: 14,
              color: "#94a3b8",
              fontSize: 13,
            }}
          >
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Title({ text }) {
  return (
    <div
      style={{
        color: "#fff",
        fontWeight: 800,
        marginBottom: 16,
        fontSize: 15,
      }}
    >
      {text}
    </div>
  );
}

function FooterLink({ text, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        color: "#94a3b8",
        fontSize: 14,
        marginBottom: 12,
        cursor: onClick
          ? "pointer"
          : "default",
      }}
    >
      {text}
    </div>
  );
}