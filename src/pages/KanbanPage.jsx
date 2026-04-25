// src/pages/KanbanPage.jsx

import React from "react";
import { useApp } from "../context/AppContext";
import { C } from "../utils/constants";

/* ---------- STATUS ---------- */
const STATUS = {
  new: {
    label: "New",
    color: "#94a3b8",
  },
  in_progress: {
    label: "In Progress",
    color: "#f59e0b",
  },
  resolved: {
    label: "Resolved",
    color: "#22c55e",
  },
};

/* ---------- CATEGORY ---------- */
const CAT = {
  infrastructure: {
    icon: "🏗",
    color: "#3b82f6",
  },
  sanitation: {
    icon: "🧹",
    color: "#f59e0b",
  },
  safety: {
    icon: "⚠",
    color: "#ef4444",
  },
  greenery: {
    icon: "🌿",
    color: "#22c55e",
  },
};

export default function KanbanPage() {
  const { state, dispatch } = useApp();

  /* Safe grouping */
  const grouped = {
    new: [],
    in_progress: [],
    resolved: [],
  };

  state.issues.forEach(
    (issue) => {
      const key =
        issue.status ||
        "new";

      if (
        grouped[key]
      ) {
        grouped[key].push(
          issue
        );
      } else {
        grouped.new.push(
          issue
        );
      }
    }
  );

  /* Sort by votes */
  Object.keys(
    grouped
  ).forEach((k) => {
    grouped[k].sort(
      (a, b) =>
        b.votes -
        a.votes
    );
  });

  /* Drag start */
  const dragStart = (
    e,
    id
  ) => {
    e.dataTransfer.setData(
      "issueId",
      id
    );
  };

  /* Drop */
  const drop = (
    e,
    status
  ) => {
    e.preventDefault();

    const id =
      e.dataTransfer.getData(
        "issueId"
      );

    dispatch({
      type:
        "UPDATE_STATUS",
      id,
      status,
    });
  };

  return (
    <div
      style={{
        padding: 28,
        maxWidth: 1350,
        margin: "0 auto",
      }}
    >
      {/* Heading */}
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: C.text,
            marginBottom: 8,
          }}
        >
          Civic Kanban Board
        </h1>

        <p
          style={{
            color: C.muted,
            fontSize: 14,
          }}
        >
          Drag issues between
          columns to update
          status.
        </p>
      </div>

      {/* Columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: 18,
        }}
      >
        {Object.keys(
          STATUS
        ).map((key) => (
          <div
            key={key}
            onDragOver={(
              e
            ) =>
              e.preventDefault()
            }
            onDrop={(e) =>
              drop(
                e,
                key
              )
            }
            style={{
              background:
                C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              minHeight:
                "72vh",
              padding: 16,
            }}
          >
            {/* Header */}
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                paddingBottom: 12,
                marginBottom: 14,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <span
                style={{
                  color:
                    STATUS[
                      key
                    ]
                      .color,
                  fontWeight: 800,
                  fontSize: 15,
                }}
              >
                {
                  STATUS[
                    key
                  ].label
                }
              </span>

              <span
                style={{
                  color:
                    C.muted,
                  fontSize: 12,
                }}
              >
                {
                  grouped[
                    key
                  ]
                    .length
                }
              </span>
            </div>

            {/* Cards */}
            <div
              style={{
                display:
                  "flex",
                flexDirection:
                  "column",
                gap: 12,
              }}
            >
              {grouped[
                key
              ].map(
                (
                  issue
                ) => {
                  const cat =
                    CAT[
                      issue.category
                    ] ||
                    CAT.infrastructure;

                  return (
                    <div
                      key={
                        issue.id
                      }
                      draggable
                      onDragStart={(
                        e
                      ) =>
                        dragStart(
                          e,
                          issue.id
                        )
                      }
                      style={{
                        background:
                          C.surface2,
                        border: `1px solid ${C.border}`,
                        borderRadius: 16,
                        padding: 14,
                        cursor:
                          "grab",
                        transition:
                          "all .25s ease",
                      }}
                    >
                      {/* Category */}
                      <div
                        style={{
                          color:
                            cat.color,
                          fontSize: 12,
                          fontWeight: 700,
                          marginBottom: 8,
                        }}
                      >
                        {
                          cat.icon
                        }{" "}
                        {
                          issue.category
                        }
                      </div>

                      {/* Title */}
                      <div
                        style={{
                          color:
                            C.text,
                          fontSize: 15,
                          fontWeight: 800,
                          lineHeight: 1.4,
                          marginBottom: 10,
                        }}
                      >
                        {
                          issue.title
                        }
                      </div>

                      {/* Footer */}
                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          color:
                            C.muted,
                          fontSize: 12,
                        }}
                      >
                        <span>
                          👍{" "}
                          {
                            issue.votes
                          }
                        </span>

                        <span>
                          {issue.zone ||
                            "Mumbai"}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}

              {grouped[
                key
              ].length ===
                0 && (
                <div
                  style={{
                    color:
                      C.muted,
                    fontSize: 13,
                    textAlign:
                      "center",
                    marginTop: 40,
                  }}
                >
                  Drop issues
                  here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}