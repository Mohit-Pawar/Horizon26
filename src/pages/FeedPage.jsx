// src/pages/FeedPage.jsx

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { C, CAT, STATUS } from "../utils/constants";
import MetricStrip from "../components/MetricStrip";
import IssueCard from "../components/IssueCard";

export default function FeedPage() {
  const { state } = useApp();

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("votes");
  const [search, setSearch] = useState("");

  const filters = [
    "all",
    "infrastructure",
    "sanitation",
    "safety",
    "greenery",
    "new",
    "in_progress",
    "resolved",
  ];

  const filteredIssues = state.issues
    .filter((item) => {
      if (filter === "all") return true;
      return (
        item.category === filter ||
        item.status === filter
      );
    })
    .filter((item) => {
      const q = search.toLowerCase();

      return (
        item.title.toLowerCase().includes(q) ||
        item.zone.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "votes") {
        return b.votes - a.votes;
      }

      return (
        new Date(b.date) - new Date(a.date)
      );
    });

  const getColor = (key) => {
    if (key === "all") return C.green;
    if (CAT[key]) return CAT[key].color;
    if (STATUS[key]) return STATUS[key].color;
    return C.muted;
  };

  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "26px 28px",
      }}
    >
      {/* Heading */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: C.text,
            marginBottom: 6,
            letterSpacing: "-0.03em",
          }}
        >
          Community Feed
        </h1>

        <p
          style={{
            color: C.muted,
            fontSize: 14,
          }}
        >
          Real issues. Real citizens. Real action.
        </p>
      </div>

      {/* Metrics */}
      <MetricStrip issues={state.issues} />

      {/* Search + Sort */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder=" Search issue or zone..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            flex: 1,
            minWidth: 240,
            background: C.surface,
            border: `1px solid ${C.border}`,
            color: C.text,
            padding: "10px 14px",
            borderRadius: 10,
            outline: "none",
            fontFamily: "inherit",
          }}
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            color: C.muted,
            padding: "10px 14px",
            borderRadius: 10,
            fontFamily: "inherit",
          }}
        >
          <option value="votes">
            Sort: Top Voted
          </option>
          <option value="date">
            Sort: Latest
          </option>
        </select>
      </div>

      {/* Filter Chips */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        {filters.map((item) => {
          const active = filter === item;
          const color = getColor(item);

          return (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: `1px solid ${
                  active
                    ? color
                    : C.border
                }`,
                background: active
                  ? `${color}22`
                  : "transparent",
                color: active
                  ? color
                  : C.muted,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "inherit",
                textTransform:
                  "capitalize",
              }}
            >
              {item.replace(
                "_",
                " "
              )}
            </button>
          );
        })}
      </div>

      {/* Issues */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
            />
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              color: C.dim,
              padding: "50px 0",
            }}
          >
            No issues found.
          </div>
        )}
      </div>
    </div>
  );
}