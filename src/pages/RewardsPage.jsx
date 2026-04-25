// src/pages/RewardsPage.jsx

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { C } from "../utils/constants";
import Btn from "../components/Btn";

export default function RewardsPage() {
  const { state, dispatch } = useApp();
  const [redeemed, setRedeemed] = useState([]);

  const rewards = [
    {
      id: "r1",
      icon: "🚌",
      title: "Monthly Bus Pass",
      pts: 200,
      desc: "Free local city bus travel for one month.",
    },
    {
      id: "r2",
      icon: "🍔",
      title: "₹50 Food Coupon",
      pts: 150,
      desc: "Discount coupon on food delivery.",
    },
    {
      id: "r3",
      icon: "🛒",
      title: "₹30 Grocery Cashback",
      pts: 100,
      desc: "Instant cashback on grocery order.",
    },
    {
      id: "r4",
      icon: "🌱",
      title: "Green Hero Certificate",
      pts: 75,
      desc: "Digital civic contribution certificate.",
    },
    {
      id: "r5",
      icon: "🅿️",
      title: "Parking Token",
      pts: 60,
      desc: "One free municipal parking day.",
    },
    {
      id: "r6",
      icon: "🏛️",
      title: "Tax Rebate Voucher",
      pts: 500,
      desc: "Special municipal rebate benefit.",
    },
  ];

  const redeemReward = (reward) => {
    if (
      state.userPoints >= reward.pts &&
      !redeemed.includes(reward.id)
    ) {
      dispatch({
        type: "SET_USER_POINTS",
        delta: -reward.pts,
      });

      setRedeemed((prev) => [
        ...prev,
        reward.id,
      ]);
    }
  };

  return (
    <div
      style={{
        maxWidth: 1050,
        margin: "0 auto",
        padding: "26px 28px",
      }}
    >
      {/* Top */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: C.text,
              marginBottom: 6,
              letterSpacing: "-0.03em",
            }}
          >
            Rewards Center
          </h1>

          <p
            style={{
              color: C.muted,
              fontSize: 14,
            }}
          >
            Earn points through civic action and redeem benefits.
          </p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(34,197,94,0.14),rgba(34,197,94,0.05))",
            border:
              "1px solid rgba(34,197,94,0.22)",
            borderRadius: 18,
            padding:
              "18px 24px",
            minWidth: 220,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              textTransform:
                "uppercase",
              marginBottom: 4,
            }}
          >
            Available Balance
          </div>

          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: C.green,
            }}
          >
            ⭐ {state.userPoints}
          </div>

          <div
            style={{
              fontSize: 12,
              color: C.dim,
            }}
          >
            Civic Points
          </div>
        </div>
      </div>

      {/* Earn Guide */}
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: 18,
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontSize: 14,
            color: C.text,
            marginBottom: 14,
            fontWeight: 700,
          }}
        >
          How to Earn Points
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(160px,1fr))",
            gap: 10,
          }}
        >
          {[
            ["📍 Report Issue", "+50"],
            ["▲ Upvote", "+2"],
            ["💬 Comment", "+5"],
            ["✅ Resolved Issue", "+100"],
          ].map(([title, pts]) => (
            <div
              key={title}
              style={{
                background:
                  C.surface2,
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: C.muted,
                  marginBottom: 6,
                }}
              >
                {title}
              </div>

              <div
                style={{
                  fontWeight: 800,
                  color: C.green,
                }}
              >
                {pts} pts
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: 14,
        }}
      >
        {rewards.map((reward) => {
          const done =
            redeemed.includes(
              reward.id
            );

          const canBuy =
            state.userPoints >=
            reward.pts;

          return (
            <div
              key={
                reward.id
              }
              style={{
                background:
                  C.surface,
                border: `1px solid ${
                  done
                    ? "rgba(34,197,94,0.24)"
                    : C.border
                }`,
                borderRadius: 18,
                padding: 18,
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  marginBottom: 10,
                }}
              >
                {
                  reward.icon
                }
              </div>

              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: C.text,
                  marginBottom: 6,
                }}
              >
                {
                  reward.title
                }
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: C.muted,
                  lineHeight: 1.6,
                  marginBottom: 14,
                }}
              >
                {
                  reward.desc
                }
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                }}
              >
                <span
                  style={{
                    color:
                      C.green,
                    fontWeight: 800,
                  }}
                >
                  ⭐{" "}
                  {
                    reward.pts
                  }
                </span>

                <Btn
                  disabled={
                    done ||
                    !canBuy
                  }
                  onClick={() =>
                    redeemReward(
                      reward
                    )
                  }
                >
                  {done
                    ? "Redeemed"
                    : canBuy
                    ? "Redeem"
                    : "Not Enough"}
                </Btn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}