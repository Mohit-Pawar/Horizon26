// src/pages/IssueDetailPage.jsx

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { C, STATUS } from "../utils/constants";
import Badge from "../components/Badge";
import StatusDot from "../components/StatusDot";
import Btn from "../components/Btn";

export default function IssueDetailPage() {
  const { state, dispatch } = useApp();
  const [comment, setComment] = useState("");

  const issue = state.issues.find(
    (item) => item.id === state.pageData
  );

  if (!issue) {
    return (
      <div
        style={{
          padding: 30,
          color: C.dim,
        }}
      >
        Issue not found.
      </div>
    );
  }

  const goBack = () => {
    dispatch({
      type: "SET_PAGE",
      page: "feed",
    });
  };

  const upvote = () => {
    dispatch({
      type: "UPVOTE",
      id: issue.id,
    });

    dispatch({
      type: "SET_USER_POINTS",
      delta: 2,
    });
  };

  const updateStatus = (status) => {
    dispatch({
      type: "UPDATE_STATUS",
      id: issue.id,
      status,
    });
  };

  const addComment = () => {
    if (!comment.trim()) return;

    dispatch({
      type: "ADD_COMMENT",
      id: issue.id,
      comment: {
        user: "Fatima A.",
        text: comment,
        time: "Just now",
      },
    });

    dispatch({
      type: "SET_USER_POINTS",
      delta: 5,
    });

    setComment("");
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "26px 28px",
      }}
    >
      {/* Back */}
      <button
        onClick={goBack}
        style={{
          border: "none",
          background: "none",
          color: C.muted,
          cursor: "pointer",
          marginBottom: 18,
          fontFamily: "inherit",
          fontSize: 13,
        }}
      >
        ← Back to Feed
      </button>

      {/* Main Card */}
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 22,
          padding: 28,
          marginBottom: 24,
        }}
      >
        {/* Top Meta */}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <Badge cat={issue.category} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <StatusDot
              status={issue.status}
            />

            <span
              style={{
                fontSize: 12,
                color:
                  STATUS[
                    issue.status
                  ]?.color,
                fontWeight: 700,
              }}
            >
              {
                STATUS[
                  issue.status
                ]?.label
              }
            </span>
          </div>

          {issue.verified && (
            <span
              style={{
                fontSize: 11,
                color: C.green,
                padding:
                  "4px 10px",
                borderRadius: 999,
                background:
                  "rgba(34,197,94,0.12)",
                border:
                  "1px solid rgba(34,197,94,0.22)",
              }}
            >
              ✓ Verified
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 28,
            color: C.text,
            fontWeight: 800,
            lineHeight: 1.3,
            marginBottom: 12,
          }}
        >
          {issue.title}
        </h1>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: 18,
            flexWrap: "wrap",
            color: C.dim,
            fontSize: 13,
            marginBottom: 18,
          }}
        >
          <span>
            👤 {issue.reportedBy}
          </span>
          <span>
            📍 {issue.zone}
          </span>
          <span>
            📅 {issue.date}
          </span>
          <span>
            ▲ {issue.votes}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            color: C.muted,
            lineHeight: 1.8,
            fontSize: 14,
            marginBottom: 22,
          }}
        >
          {issue.description}
        </p>

        {/* Photo */}
        <div
          style={{
            height: 220,
            borderRadius: 18,
            border: `1px dashed ${C.border}`,
            background: C.surface2,
            display: "grid",
            placeItems: "center",
            color: C.dim,
            marginBottom: 22,
          }}
        >
          📷 No image uploaded
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <Btn onClick={upvote}>
            ▲ Upvote
          </Btn>

          {["new", "in_progress", "resolved"]
            .filter(
              (s) =>
                s !== issue.status
            )
            .map((status) => (
              <Btn
                key={status}
                variant="ghost"
                onClick={() =>
                  updateStatus(
                    status
                  )
                }
              >
                Move to{" "}
                {
                  STATUS[
                    status
                  ].label
                }
              </Btn>
            ))}
        </div>
      </div>

      {/* Comments */}
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 22,
          padding: 24,
        }}
      >
        <h2
          style={{
            color: C.text,
            fontSize: 18,
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          Comments (
          {issue.comments.length})
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 18,
          }}
        >
          {issue.comments.length ===
          0 ? (
            <div
              style={{
                color: C.dim,
                fontSize: 14,
              }}
            >
              No comments yet.
            </div>
          ) : (
            issue.comments.map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  style={{
                    background:
                      C.surface2,
                    borderRadius: 14,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        color:
                          C.green,
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {
                        item.user
                      }
                    </span>

                    <span
                      style={{
                        color:
                          C.dim,
                        fontSize: 12,
                      }}
                    >
                      {
                        item.time
                      }
                    </span>
                  </div>

                  <div
                    style={{
                      color:
                        C.muted,
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {
                      item.text
                    }
                  </div>
                </div>
              )
            )
          )}
        </div>

        {/* Add Comment */}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <input
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            placeholder="Write a comment..."
            style={{
              flex: 1,
              minWidth: 220,
              padding:
                "12px 14px",
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              background:
                C.surface2,
              color: C.text,
              outline: "none",
              fontFamily:
                "inherit",
            }}
          />

          <Btn
            onClick={addComment}
          >
            Post
          </Btn>
        </div>
      </div>
    </div>
  );
}