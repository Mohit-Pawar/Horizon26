// src/pages/ProfilePage.jsx

import React from "react";
import { useApp } from "../context/AppContext";
import { C } from "../utils/constants";
import Card from "../components/Card";
import Badge from "../components/Badge";
import StatusDot from "../components/StatusDot";

export default function ProfilePage() {
  const { state, dispatch } = useApp();

  /* Logged in user from state or localStorage */
  const currentUser =
    state.currentUser ||
    JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

  /* If not logged in */
  if (!currentUser) {
    return (
      <div
        style={{
          padding: 60,
          textAlign: "center",
          color: C.text,
        }}
      >
        <h1>Please Login First</h1>
      </div>
    );
  }

  const myName = currentUser.name;
  const myEmail = currentUser.email;

  const initials = myName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const myIssues = state.issues.filter(
    (item) =>
      item.reportedBy === myName ||
      item.reportedBy === `${myName}`
  );

  const resolvedCount = myIssues.filter(
    (item) => item.status === "resolved"
  ).length;

  const totalVotes = myIssues.reduce(
    (sum, item) => sum + item.votes,
    0
  );

  const openIssue = (id) => {
    dispatch({
      type: "SET_PAGE",
      page: "issue",
      data: id,
    });
  };

  const logout = () => {
    localStorage.removeItem("currentUser");

    dispatch({
      type: "LOGOUT",
    });

    dispatch({
      type: "SET_PAGE",
      page: "home",
    });
  };

  const stats = [
    {
      label: "Issues Reported",
      value: myIssues.length,
      color: C.blue,
    },
    {
      label: "Resolved",
      value: resolvedCount,
      color: C.green,
    },
    {
      label: "Credits",
      value:
        currentUser.credits ||
        state.userPoints,
      color: C.amber,
    },
    {
      label: "Votes Received",
      value: totalVotes,
      color: C.purple,
    },
  ];

  const achievements = [
    {
      icon: "🏅",
      title: "First Report",
      desc: "Submitted first civic issue",
      earned: true,
    },
    {
      icon: "🔥",
      title: "Active Citizen",
      desc: "5 reports in one month",
      earned: myIssues.length >= 5,
    },
    {
      icon: "⭐",
      title: "Top Supporter",
      desc: "100 Credits earned",
      earned:
        (currentUser.credits || 0) >= 100,
    },
    {
      icon: "🏆",
      title: "Zone Hero",
      desc: "10 resolved reports",
      earned: resolvedCount >= 10,
    },
  ];

  return (
    <div
      style={{
        maxWidth: 950,
        margin: "0 auto",
        padding: "26px 28px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 22,
          padding: 28,
          display: "flex",
          gap: 22,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 26,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 82,
            height: 82,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#16a34a,#22c55e)",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          {initials}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: 26,
              color: C.text,
              fontWeight: 800,
              marginBottom: 6,
            }}
          >
            {myName}
          </h1>

          <p
            style={{
              color: C.muted,
              fontSize: 14,
              marginBottom: 14,
            }}
          >
            {myEmail}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(120px,1fr))",
              gap: 14,
            }}
          >
            {stats.map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: item.color,
                  }}
                >
                  {item.value}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    color: C.dim,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            border: "none",
            background: "#ef4444",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* My Reports */}
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontSize: 18,
            color: C.text,
            fontWeight: 800,
            marginBottom: 14,
          }}
        >
          My Reported Issues
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {myIssues.length === 0 ? (
            <div
              style={{
                color: C.dim,
                fontSize: 14,
              }}
            >
              No issues reported yet.
            </div>
          ) : (
            myIssues.map((issue) => (
              <Card
                key={issue.id}
                onClick={() =>
                  openIssue(issue.id)
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <div>
                    <Badge
                      cat={issue.category}
                    />

                    <div
                      style={{
                        color: C.text,
                        fontWeight: 700,
                        marginTop: 8,
                      }}
                    >
                      {issue.title}
                    </div>

                    <div
                      style={{
                        color: C.dim,
                        fontSize: 12,
                        marginTop: 6,
                      }}
                    >
                      {issue.zone} ·{" "}
                      {issue.date}
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign:
                        "right",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        gap: 6,
                        alignItems:
                          "center",
                        justifyContent:
                          "flex-end",
                      }}
                    >
                      <StatusDot
                        status={
                          issue.status
                        }
                      />
                      <span
                        style={{
                          color:
                            C.muted,
                          fontSize: 12,
                        }}
                      >
                        {
                          issue.status
                        }
                      </span>
                    </div>

                    <div
                      style={{
                        color:
                          C.green,
                        marginTop: 8,
                        fontWeight: 700,
                      }}
                    >
                      ▲ {issue.votes}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2
          style={{
            fontSize: 18,
            color: C.text,
            fontWeight: 800,
            marginBottom: 14,
          }}
        >
          Achievements
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: 14,
          }}
        >
          {achievements.map((item) => (
            <div
              key={item.title}
              style={{
                background:
                  C.surface,
                border: `1px solid ${
                  item.earned
                    ? "rgba(34,197,94,0.25)"
                    : C.border
                }`,
                borderRadius: 18,
                padding: 18,
                opacity:
                  item.earned
                    ? 1
                    : 0.55,
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  marginBottom: 10,
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  color: C.text,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: C.muted,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}