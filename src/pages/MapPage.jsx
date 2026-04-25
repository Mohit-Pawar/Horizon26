// src/pages/MapPage.jsx

import React, {
  useState,
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useApp } from "../context/AppContext";

/* Fix marker icons */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPage() {
  const { state, dispatch } =
    useApp();

  const [pin, setPin] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState(
      "infrastructure"
    );

  const saveReport = () => {
    if (!title) return;

    dispatch({
      type: "ADD_ISSUE",
      payload: {
        id: Date.now().toString(),
        title,
        category,
        zone: "Mumbai",
        votes: 0,
        status: "new",
        lat: pin.lat,
        lng: pin.lng,
        date: new Date()
          .toISOString()
          .slice(0, 10),
      },
    });

    setPin(null);
    setTitle("");
  };

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h1
        style={{
          fontSize: 34,
          fontWeight: 800,
          marginBottom: 18,
          color: "#fff",
        }}
      >
        Mumbai Live Civic Map
      </h1>

      <MapContainer
        center={[
          19.076,
          72.8777,
        ]}
        zoom={11}
        style={{
          height: "80vh",
          width: "100%",
          borderRadius: 20,
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Click Handler */}
        <MapClicker
          setPin={setPin}
        />

        {/* Existing Reports */}
        {state.issues.map(
          (issue) =>
            issue.lat &&
            issue.lng && (
              <Marker
                key={issue.id}
                position={[
                  issue.lat,
                  issue.lng,
                ]}
              >
                <Popup>
                  <b>
                    {
                      issue.title
                    }
                  </b>
                  <br />
                  {
                    issue.status
                  }
                </Popup>
              </Marker>
            )
        )}

        {/* New Pin */}
        {pin && (
          <Marker
            position={[
              pin.lat,
              pin.lng,
            ]}
          >
            <Popup>
              <div
                style={{
                  width: 220,
                }}
              >
                <input
                  placeholder="Issue title"
                  value={
                    title
                  }
                  onChange={(
                    e
                  ) =>
                    setTitle(
                      e.target
                        .value
                    )
                  }
                  style={{
                    width:
                      "100%",
                    marginBottom: 10,
                  }}
                />

                <select
                  value={
                    category
                  }
                  onChange={(
                    e
                  ) =>
                    setCategory(
                      e.target
                        .value
                    )
                  }
                  style={{
                    width:
                      "100%",
                    marginBottom: 10,
                  }}
                >
                  <option value="infrastructure">
                    Infrastructure
                  </option>

                  <option value="sanitation">
                    Sanitation
                  </option>

                  <option value="safety">
                    Safety
                  </option>

                  <option value="greenery">
                    Greenery
                  </option>
                </select>

                <button
                  onClick={
                    saveReport
                  }
                  style={{
                    width:
                      "100%",
                    background:
                      "#22c55e",
                    color:
                      "#fff",
                    border:
                      "none",
                    padding:
                      "10px",
                    borderRadius: 8,
                  }}
                >
                  Submit Report
                </button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

/* CLICK HANDLER */
function MapClicker({
  setPin,
}) {
  useMapEvents({
    click(e) {
      setPin(
        e.latlng
      );
    },
  });

  return null;
}