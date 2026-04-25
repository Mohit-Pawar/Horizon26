// src/components/Btn.jsx

import React, { useState } from "react";
import { C } from "../utils/constants";

export default function Btn({
  children,
  onClick,
  variant = "primary",
  style = {},
  disabled = false,
  type = "button",
}) {
  const [hover, setHover] = useState(false);

  const variants = {
    primary: {
      background: hover ? C.greenDark : C.green,
      color: "#fff",
      border: "none",
      boxShadow: hover
        ? `0 6px 18px ${C.greenGlow}`
        : "none",
    },

    ghost: {
      background: hover
        ? "rgba(255,255,255,0.06)"
        : "transparent",
      color: C.muted,
      border: `1px solid ${C.border}`,
    },

    danger: {
      background: hover ? "#dc2626" : C.red,
      color: "#fff",
      border: "none",
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "10px 18px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.2s ease",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}