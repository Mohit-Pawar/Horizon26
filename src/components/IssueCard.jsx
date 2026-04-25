

import React from "react";
import { useApp } from "../context/AppContext";
import { C } from "../utils/constants";

export default function IssueCard({ issue }) {
  const { state, dispatch } = useApp();

  const currentUser =
    state.currentUser ||
    JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

  const alreadyVoted =
    currentUser &&
    issue.votedUsers?.includes(
      currentUser.email
    );

  /* ---------- Upvote ---------- */
  const handleUpvote = () => {
    if (!currentUser) {
      alert("Login first");
      return;
    }

    if (alreadyVoted) {
      alert(
        "You already upvoted this post"
      );
      return;
    }

    dispatch({
      type: "UPVOTE_ISSUE",
      id: issue.id,
    });
  };

  /* ---------- Share to Twitter / X ---------- */
  const shareToX = () => {
    const text = `🚨 Civic Issue Reported

${issue.title}

📍 ${issue.zone}

Help authorities notice this issue.

#CivicSense #FixThis #CityIssues`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;

    window.open(
      url,
      "_blank"
    );
  };

  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: 18,
      }}
    >
      {/* Top */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          gap: 18,
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              color: C.text,
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            {issue.title}
          </h3>

          <p
            style={{
              color: C.muted,
              fontSize: 14,
              marginBottom: 8,
            }}
          >
            📍 {issue.zone}
          </p>

          <p
            style={{
              color: C.dim,
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            {issue.description}
          </p>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: 10,
            minWidth: 120,
          }}
        >
          {/* Upvote */}
          <button
            onClick={
              handleUpvote
            }
            style={{
              height: 44,
              border: "none",
              borderRadius: 12,
              cursor:
                "pointer",
              fontWeight: 700,
              background:
                alreadyVoted
                  ? "#334155"
                  : "#16a34a",
              color: "#fff",
            }}
          >
            👍 {issue.votes}
          </button>

          {/* Twitter/X */}
          <button
            onClick={shareToX}
            style={{
              height: 44,
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              cursor:
                "pointer",
              fontWeight: 700,
              background:
                "#0f172a",
              color: "#fff",
            }}
          >
            𝕏 Share
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 14,
          paddingTop: 14,
          borderTop:
            "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent:
            "space-between",
          color: C.dim,
          fontSize: 12,
        }}
      >
        <span>
          by {issue.reportedBy}
        </span>

        <span>
          {issue.date}
        </span>
      </div>
    </div>
  );
}