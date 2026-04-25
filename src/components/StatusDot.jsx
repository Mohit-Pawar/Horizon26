// src/components/StatusDot.jsx

import React from "react";
import { STATUS } from "../utils/constants";

export default function StatusDot({ status, showLabel = false }) {
  const item = STATUS[status];

  if (!item) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: item.color,
          display: "inline-block",
          boxShadow: `0 0 10px ${item.color}55`,
        }}
      />

      {showLabel && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: item.color,
          }}
        >
          {item.label}
        </span>
      )}
    </span>
  );
}