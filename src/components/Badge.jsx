// src/components/Badge.jsx

import React from "react";
import { CAT } from "../utils/constants";

export default function Badge({ cat }) {
  const item = CAT[cat];

  if (!item) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        background: item.bg,
        color: item.color,
        whiteSpace: "nowrap",
      }}
    >
      <span>{item.icon}</span>
      <span>{item.label}</span>
    </span>
  );
}