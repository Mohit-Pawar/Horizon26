# Urban Eye 🚀  
### Smart Civic Issue Reporting & Community Governance Platform

Urban Eye is a modern web platform that empowers citizens to report civic issues, track resolutions, engage with their community, and help improve their city through collaborative governance.

Built using **React + Context API + LocalStorage**, Urban Eye combines civic reporting, interactive maps, rewards, Kanban workflows, and social accountability into one seamless experience.

---

# 🌟 Features

## 🏠 Home Page
- Beautiful landing page with hero section
- Clean dark modern UI
- Login / Signup access
- Footer with navigation links

---

## 🔐 Authentication
- Login & Signup system
- User credentials stored in LocalStorage
- Email validation
- Password security validation:
  - Minimum 6 characters
  - At least one symbol required

---

## 📰 Community Feed
- View all reported civic issues
- Sort by latest / top voted
- Search issues
- Upvote issues
- One user = one vote per issue
- Tweet issues directly to X (Twitter)

---

## 📍 Live Reporting Page
- Submit new civic complaints
- Upload issue title & category
- Live GPS support
- Real-time feed updates

---

## 🗺️ Interactive Map
- Real Mumbai map support
- Zoomable / draggable map
- Click anywhere to pin issue
- Add issue from map popup
- View all issue markers live

---

## 📋 Kanban Board
Track complaints through progress stages:

- New
- In Progress
- Resolved

Features:
- Drag & Drop cards
- Real-time updates
- Shared global state with feed/map

---

## 🎁 Rewards System
Earn Civic Points for participation:

- Reporting issues
- Upvoting
- Community actions

Redeemable rewards:
- Coupons
- Certificates
- Public transport passes
- Cashback offers

---

## 👤 Profile Dashboard
- User stats
- Total reports
- Resolved issues
- Points balance
- Achievements

---

# 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| React.js | Frontend |
| Context API | State Management |
| LocalStorage | Database/Auth |
| Leaflet / OpenStreetMap | Real-time Maps |
| CSS Inline Styling | UI Design |

---

# 📂 Project Structure

```bash
src/
 ├── components/
 │   ├── Header.jsx
 │   ├── Footer.jsx
 │
 ├── pages/
 │   ├── HomePage.jsx
 │   ├── LoginPage.jsx
 │   ├── SignupPage.jsx
 │   ├── FeedPage.jsx
 │   ├── ReportPage.jsx
 │   ├── MapPage.jsx
 │   ├── KanbanPage.jsx
 │   ├── RewardsPage.jsx
 │   ├── ProfilePage.jsx
 │
 ├── context/
 │   └── AppContext.jsx
 │
 ├── utils/
 │   └── constants.js