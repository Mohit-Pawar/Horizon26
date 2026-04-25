// src/components/Header.jsx

import React from "react";
import logo from "../assets/logo.jpg";

import { useApp } from "../context/AppContext";
import { C } from "../utils/constants";

export default function Header() {
  const { state, dispatch } = useApp();

  const go = (page) => {
    dispatch({
      type: "SET_PAGE",
      page,
    });
  };

  /* login check */
  const isLoggedIn =
    state.isLoggedIn === true;

  /* nav tabs */
  const navItems = isLoggedIn
  ? [
      {
        page: "feed",
        label: "Feed",
      },
      {
        page: "report",
        label: "Report",
      },
      {
        page: "map",
        label: "Map",
      },
      { page: "kanban", label: "Kanban" },
      {
        page: "rewards",
        label: "Rewards",
      },
    ]
  : [
      {
        page: "home",
        label: "Home",
      },
      {
        page: "login",
        label: "Login",
      },
      {
        page: "signup",
        label: "Signup",
      },
    ];

  /* current user */
  const currentUser =
    state.currentUser ||
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      ) || "null"
    );

  const initials =
    currentUser?.name
      ?.split(" ")
      ?.map((word) =>
        word[0]?.toUpperCase()
      )
      ?.slice(0, 2)
      ?.join("") || "U";

  return (
    <header
      style={{
        height: 68,
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent:
          "space-between",
        background:
          "rgba(10,13,15,0.92)",
        borderBottom: `1px solid ${C.border}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter:
          "blur(18px)",
      }}
    >
      {/* LEFT : LOGO */}
      <div
        onClick={() =>
          go(
            isLoggedIn
              ? "feed"
              : "home"
          )
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
          minWidth: 180,
        }}
      >
        <img
          src={logo}
          alt="Urban Eye Logo"
          style={{
            width: 46,
            height: 46,
            objectFit: "cover",
            borderRadius: 12,
          }}
        />

        <span
          style={{
            color: C.text,
            fontWeight: 800,
            fontSize: 18,
            letterSpacing:
              "-0.02em",
          }}
        >
          Urban Eye
        </span>
      </div>

      {/* CENTER : NAV */}
      <nav
        style={{
          display: "flex",
          gap: 6,
          padding: 4,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          background:
            C.surface,
        }}
      >
        {navItems.map(
          (item) => {
            const active =
              state.page ===
              item.page;

            return (
              <button
                key={
                  item.page
                }
                onClick={() =>
                  go(
                    item.page
                  )
                }
                style={{
                  border:
                    "none",
                  padding:
                    "8px 18px",
                  borderRadius: 10,
                  cursor:
                    "pointer",
                  background:
                    active
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                  color: active
                    ? C.text
                    : C.muted,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily:
                    "inherit",
                  transition:
                    "0.2s",
                }}
              >
                {item.label}
              </button>
            );
          }
        )}
      </nav>

      {/* RIGHT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: 12,
          minWidth: 180,
          justifyContent:
            "flex-end",
        }}
      >
        {isLoggedIn && (
          <>
            {/* points */}
            <div
              style={{
                padding:
                  "8px 12px",
                borderRadius: 10,
                background:
                  "rgba(34,197,94,0.12)",
                border:
                  "1px solid rgba(34,197,94,0.20)",
                color:
                  C.green,
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              ⭐{" "}
              {state.userPoints}
            </div>

            {/* profile */}
            <div
              onClick={() =>
                go(
                  "profile"
                )
              }
              style={{
                width: 38,
                height: 38,
                borderRadius:
                  "50%",
                background:
                  "linear-gradient(135deg,#16a34a,#22c55e)",
                color:
                  "#fff",
                display:
                  "grid",
                placeItems:
                  "center",
                fontWeight: 800,
                fontSize: 13,
                cursor:
                  "pointer",
              }}
            >
              {initials}
            </div>
          </>
        )}
      </div>
    </header>
  );
}