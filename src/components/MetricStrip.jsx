// src/components/MetricStrip.jsx

import React from "react";
import { C, CAT } from "../utils/constants";

export default function MetricStrip({ issues = [] }) {
  const total = issues.length;

  const resolved = issues.filter(
    (item) => item.status === "resolved"
  ).length;

  const resolutionRate = total
    ? Math.round((resolved / total) * 100)
    : 0;

  const zoneCount = {};
  const catCount = {};

  issues.forEach((item) => {
    zoneCount[item.zone] = (zoneCount[item.zone] || 0) + 1;
    catCount[item.category] =
      (catCount[item.category] || 0) + 1;
  });

  const hotspotZone =
    Object.entries(zoneCount).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "—";

  const topCategoryKey =
    Object.entries(catCount).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || null;

  const topCategory =
    topCategoryKey && CAT[topCategoryKey]
      ? CAT[topCategoryKey].label
      : "—";

  const topColor =
    topCategoryKey && CAT[topCategoryKey]
      ? CAT[topCategoryKey].color
      : C.muted;

  const stats = [
    {
      label: "Total Issues",
      value: total,
      color: C.text,
    },
    {
      label: "Resolution Rate",
      value: `${resolutionRate}%`,
      color: C.green,
    },
    {
      label: "Hotspot Zone",
      value: hotspotZone,
      color: C.amber,
    },
    {
      label: "Top Category",
      value: topCategory,
      color: topColor,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(180px,1fr))",
        gap: 12,
        marginBottom: 22,
      }}
    >
      {stats.map((item) => (
        <div
          key={item.label}
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 6,
            }}
          >
            {item.label}
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: item.color,
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}