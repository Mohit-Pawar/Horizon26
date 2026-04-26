// src/pages/KanbanPage.jsx

import React from "react";
import { useApp } from "../context/AppContext";
import { C } from "../utils/constants";

/*
FIXED VERSION:
✔ Drag works
✔ Drop works
✔ Card moves instantly
✔ Uses reducer UPDATE_STATUS
✔ Sorted by votes
*/

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

const CAT = {
  infrastructure: "🏗",
  sanitation: "🧹",
  safety: "⚠",
  greenery: "🌿",
};

export default function KanbanPage() {
  const { state, dispatch } =
    useApp();

  /* Group Issues */
  const columns = {
    new: [],
    in_progress: [],
    resolved: [],
  };

  state.issues.forEach(
    (issue) => {
      const key =
        issue.status ||
        "new";

      columns[key].push(
        issue
      );
    }
  );

  /* Sort by votes */
  Object.keys(
    columns
  ).forEach((key) => {
    columns[key].sort(
      (a, b) =>
        b.votes -
        a.votes
    );
  });

  /* DRAG START */
  const handleDragStart = (
    e,
    issueId
  ) => {
    e.dataTransfer.setData(
      "issueId",
      issueId
    );
  };

  /* DROP */
  const handleDrop = (
    e,
    newStatus
  ) => {
    e.preventDefault();

    const issueId =
      e.dataTransfer.getData(
        "issueId"
      );

    dispatch({
      type:
        "UPDATE_STATUS",
      id: issueId,
      status:
        newStatus,
    });
  };

  const allowDrop = (e) =>
    e.preventDefault();

  return (
    <div
      style={{
        padding: 28,
        maxWidth: 1350,
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: C.text,
          marginBottom: 24,
        }}
      >
        Kanban Board
      </h1>

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
            onDragOver={
              allowDrop
            }
            onDrop={(e) =>
              handleDrop(
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
                "75vh",
              padding: 16,
            }}
          >
            {/* Header */}
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color:
                  STATUS[
                    key
                  ].color,
                marginBottom: 16,
              }}
            >
              {
                STATUS[
                  key
                ].label
              }{" "}
              (
              {
                columns[
                  key
                ].length
              }
              )
            </div>

            {/* Cards */}
            {columns[
              key
            ].map(
              (
                issue
              ) => (
                <div
                  key={
                    issue.id
                  }
                  draggable
                  onDragStart={(
                    e
                  ) =>
                    handleDragStart(
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
                    marginBottom: 12,
                    cursor:
                      "grab",
                    transition:
                      "0.25s ease",
                  }}
                >
                  <div
                    style={{
                      color:
                        C.muted,
                      fontSize: 12,
                      marginBottom: 8,
                    }}
                  >
                    {CAT[
                      issue.category
                    ]}{" "}
                    {
                      issue.category
                    }
                  </div>

                  <div
                    style={{
                      color:
                        C.text,
                      fontWeight: 800,
                      marginBottom: 10,
                    }}
                  >
                    {
                      issue.title
                    }
                  </div>

                  <div
                    style={{
                      color:
                        C.muted,
                      fontSize: 12,
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
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
              )
            )}

            {columns[
              key
            ].length ===
              0 && (
              <div
                style={{
                  color:
                    C.muted,
                  marginTop: 40,
                  textAlign:
                    "center",
                }}
              >
                Drop here
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}