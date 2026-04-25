// src/App.jsx

import React from "react";
import { AppProvider, useApp } from "./context/AppContext";

import Header from "./components/Header";
import KanbanPage from "./pages/KanbanPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import FeedPage from "./pages/FeedPage";
import MapPage from "./pages/MapPage";
import ReportPage from "./pages/ReportPage";
import RewardsPage from "./pages/RewardsPage";
import ProfilePage from "./pages/ProfilePage";
import IssueDetailPage from "./pages/IssueDetailPage";

/* NEW */
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

function Router() {
  const { state } = useApp();

  /* ---------- BEFORE LOGIN ---------- */
  if (!state.isLoggedIn) {
    if (state.page === "login") return <LoginPage />;
    if (state.page === "signup") return <SignupPage />;

    // default page
    return <HomePage />;
  }

  /* ---------- AFTER LOGIN ---------- */
const pages = {
  home: HomePage,
  login: LoginPage,
  signup: SignupPage,
  feed: FeedPage,
  report: ReportPage,
  map: MapPage,
  kanban: KanbanPage,
  rewards: RewardsPage,
  profile: ProfilePage,
  issue: IssueDetailPage,
};
  const Page = pages[state.page] || FeedPage;

  return <Page />;
}

function Layout() {
  const { state } = useApp();

  const guestMode = !state.isLoggedIn;
  const showFooter =
    guestMode &&
    state.page !== "login" &&
    state.page !== "signup";

  return (
    <div className="app-shell">
      <Header />

      <main className="main-scroll">
        <Router />
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}