// src/components/Card.jsx

import React, { useState } from "react";
import { C } from "../utils/constants";

export default function Card({
  children,
  onClick,
  style = {},
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.surface,
        border: `1px solid ${
          hover && onClick ? C.borderHover : C.border
        }`,
        borderRadius: 16,
        padding: "18px",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.18s ease",
        transform:
          hover && onClick ? "translateY(-2px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}