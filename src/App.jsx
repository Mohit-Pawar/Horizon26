// src/App.jsx

import React, {
  useEffect,
} from "react";

import {
  AppProvider,
  useApp,
} from "./context/AppContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import KanbanPage from "./pages/KanbanPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FeedPage from "./pages/FeedPage";
import MapPage from "./pages/MapPage";
import ReportPage from "./pages/ReportPage";
import RewardsPage from "./pages/RewardsPage";
import ProfilePage from "./pages/ProfilePage";
import IssueDetailPage from "./pages/IssueDetailPage";
import HomePage from "./pages/HomePage";

/* ---------------- ROUTER ---------------- */
function Router() {
  const { state } =
    useApp();

  /* BEFORE LOGIN */
  if (
    !state.isLoggedIn
  ) {
    if (
      state.page ===
      "login"
    )
      return (
        <LoginPage />
      );

    if (
      state.page ===
      "signup"
    )
      return (
        <SignupPage />
      );

    return (
      <HomePage />
    );
  }

  /* AFTER LOGIN */
  const pages = {
    feed: FeedPage,
    report:
      ReportPage,
    map: MapPage,
    kanban:
      KanbanPage,
    rewards:
      RewardsPage,
    profile:
      ProfilePage,
    issue:
      IssueDetailPage,
  };

  const Page =
    pages[
      state.page
    ] ||
    FeedPage;

  return <Page />;
}

/* ---------------- LAYOUT ---------------- */
function Layout() {
  const { state } =
    useApp();

  const guestMode =
    !state.isLoggedIn;

  const showFooter =
    guestMode &&
    state.page !==
      "login" &&
    state.page !==
      "signup";

  /* Scroll Reveal */
  useEffect(() => {
    const els =
      document.querySelectorAll(
        ".reveal"
      );

    const observer =
      new IntersectionObserver(
        (
          entries
        ) => {
          entries.forEach(
            (
              entry
            ) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "show"
                );
              }
            }
          );
        },
        {
          threshold:
            0.12,
        }
      );

    els.forEach(
      (el) =>
        observer.observe(
          el
        )
    );

    return () =>
      observer.disconnect();
  }, []);

  return (
    <>
      {/* GLOBAL CSS */}
      <style>{`
        html{
          scroll-behavior:smooth;
        }

        body{
          margin:0;
          background:#0a0d0f;
          overflow-x:hidden;
          font-family:Inter,sans-serif;
        }

        *{
          box-sizing:border-box;
          transition:
            background-color .25s ease,
            color .25s ease,
            border-color .25s ease,
            box-shadow .25s ease,
            transform .25s ease;
        }

        /* Page Entry */
        .page-enter{
          animation:pageFade .65s ease;
        }

        @keyframes pageFade{
          from{
            opacity:0;
            transform:translateY(20px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        /* Scroll Reveal */
        .reveal{
          opacity:0;
          transform:translateY(35px);
        }

        .reveal.show{
          opacity:1;
          transform:translateY(0);
          transition:
            opacity .8s ease,
            transform .8s ease;
        }

        /* Lift Hover */
        .lift:hover{
          transform:translateY(-4px);
          box-shadow:
            0 14px 28px rgba(0,0,0,.18);
        }

        /* Floating */
        .float{
          animation:float 3.5s ease-in-out infinite;
        }

        @keyframes float{
          0%,100%{
            transform:translateY(0px);
          }
          50%{
            transform:translateY(-8px);
          }
        }

        /* Pulse */
        .pulse{
          animation:pulse 2s infinite;
        }

        @keyframes pulse{
          0%{
            box-shadow:0 0 0 0 rgba(34,197,94,.35);
          }
          70%{
            box-shadow:0 0 0 14px rgba(34,197,94,0);
          }
          100%{
            box-shadow:0 0 0 0 rgba(34,197,94,0);
          }
        }

        ::-webkit-scrollbar{
          width:8px;
        }

        ::-webkit-scrollbar-thumb{
          background:#22c55e66;
          border-radius:20px;
        }

        ::-webkit-scrollbar-track{
          background:#111;
        }
      `}</style>

      <div className="app-shell page-enter">
        <Header />

        <main className="main-scroll">
          <Router />
        </main>

        {showFooter && (
          <Footer />
        )}
      </div>
    </>
  );
}

/* ---------------- ROOT ---------------- */
export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}