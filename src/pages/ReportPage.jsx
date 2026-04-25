// src/pages/ReportPage.jsx
// FULL LIVE GPS LOCATION VERSION

import React, {
  useState,
} from "react";
import { useApp } from "../context/AppContext";
import { C } from "../utils/constants";

export default function ReportPage() {
  const { dispatch } =
    useApp();

  const [preview, setPreview] =
    useState("");

  const [loadingGps, setLoadingGps] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      category: "",
      location: "",
      lat: null,
      lng: null,
      description: "",
    });

  /* Upload Image */
  const handleImage = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () =>
      setPreview(
        reader.result
      );

    reader.readAsDataURL(
      file
    );
  };

  /* LIVE GPS */
  const detectLocation = () => {
    if (
      !navigator.geolocation
    ) {
      alert(
        "GPS not supported"
      );
      return;
    }

    setLoadingGps(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat =
          pos.coords.latitude;
        const lng =
          pos.coords.longitude;

        setForm((prev) => ({
          ...prev,
          location: `Lat ${lat.toFixed(
            5
          )}, Lng ${lng.toFixed(
            5
          )}`,
          lat,
          lng,
        }));

        setLoadingGps(false);
      },
      () => {
        alert(
          "Unable to fetch location"
        );
        setLoadingGps(false);
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  /* Submit */
  const submitReport = () => {
    if (
      !form.title ||
      !form.category ||
      !form.lat
    ) {
      alert(
        "Fill title, category and GPS location"
      );
      return;
    }

    const currentUser =
      JSON.parse(
        localStorage.getItem(
          "currentUser"
        ) || "null"
      );

    dispatch({
      type: "ADD_ISSUE",
      payload: {
        title: form.title,
        category:
          form.category,
        zone: form.location,
        description:
          form.description,
        status: "new",
        votes: 0,
        comments: [],
        votedUsers: [],
        verified: false,
        date: new Date()
          .toISOString()
          .slice(0, 10),
        reportedBy:
          currentUser?.name ||
          "Anonymous",

        /* GPS */
        lat: form.lat,
        lng: form.lng,

        photo: preview,
      },
    });

    dispatch({
      type:
        "SET_USER_POINTS",
      delta: 50,
    });

    dispatch({
      type: "SET_PAGE",
      page: "feed",
    });
  };

  return (
    <div
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: 28,
      }}
    >
      <h1
        style={{
          color: C.text,
          fontSize: 34,
          fontWeight: 800,
          marginBottom: 18,
        }}
      >
        Live GPS Report
      </h1>

      <div
        style={{
          background:
            C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          padding: 26,
        }}
      >
        {/* Title */}
        <input
          placeholder="Issue Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target.value,
            })
          }
          style={input}
        />

        {/* Category */}
        <select
          value={
            form.category
          }
          onChange={(e) =>
            setForm({
              ...form,
              category:
                e.target.value,
            })
          }
          style={input}
        >
          <option value="">
            Select Category
          </option>
          <option value="infrastructure">
            Roads
          </option>
          <option value="sanitation">
            Garbage
          </option>
          <option value="greenery">
            Greenery
          </option>
          <option value="safety">
            Safety
          </option>
        </select>

        {/* GPS */}
        <button
          onClick={
            detectLocation
          }
          style={{
            ...btn,
            marginBottom: 16,
          }}
        >
          {loadingGps
            ? "Detecting..."
            : "📍 Use Live GPS"}
        </button>

        {form.location && (
          <div
            style={{
              color:
                "#22c55e",
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            {form.location}
          </div>
        )}

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={
            handleImage
          }
          style={{
            marginBottom: 18,
            color: "#fff",
          }}
        />

        {preview && (
          <img
            src={preview}
            alt=""
            style={{
              width:
                "100%",
              height: 180,
              objectFit:
                "cover",
              borderRadius: 14,
              marginBottom: 18,
            }}
          />
        )}

        {/* Desc */}
        <textarea
          rows="4"
          placeholder="Describe issue..."
          value={
            form.description
          }
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
          style={{
            ...input,
            height: 120,
            paddingTop: 14,
          }}
        />

        {/* Submit */}
        <button
          onClick={
            submitReport
          }
          style={btn}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  height: 52,
  borderRadius: 14,
  border:
    "1px solid rgba(255,255,255,0.08)",
  background:
    "#181d22",
  color: "#fff",
  padding: "0 16px",
  marginBottom: 16,
  outline: "none",
};

const btn = {
  width: "100%",
  height: 54,
  border: "none",
  borderRadius: 14,
  background:
    "linear-gradient(135deg,#16a34a,#22c55e)",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};