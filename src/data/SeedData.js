// src/data/seedData.js

export const SEED_ISSUES = [
  {
    id: "i1",
    title: "Waterlogging near Market Zone",
    category: "sanitation",
    status: "in_progress",
    votes: 47,
    x: 220,
    y: 180,
    zone: "Market Zone",
    date: "2025-04-10",
    photo: null,
    comments: [
      {
        user: "Ravi K.",
        text: "This happens every monsoon!",
        time: "2d ago",
      },
      {
        user: "Priya M.",
        text: "Ward officer was informed.",
        time: "1d ago",
      },
      {
  id: 1,
  title: "Broken Street Light",
  votes: 5,
  votedUsers: []
}
    ],
    reportedBy: "Fatima A.",
    verified: false,
    description:
      "Severe waterlogging blocks the main market road every time it rains. Needs proper drainage.",
  },

  {
    id: "i2",
    title: "Broken streetlight on NH-4 stretch",
    category: "infrastructure",
    status: "new",
    votes: 31,
    x: 340,
    y: 130,
    zone: "NH-4 Corridor",
    date: "2025-04-14",
    photo: null,
    comments: [
      {
        user: "Anil S.",
        text: "Kids almost got hurt last night.",
        time: "3h ago",
      },
    ],
    reportedBy: "Rohan D.",
    verified: false,
    description:
      "Three consecutive streetlights non-functional. Road is dangerous at night.",
  },

  {
    id: "i3",
    title: "Open garbage dump by school",
    category: "sanitation",
    status: "new",
    votes: 28,
    x: 160,
    y: 270,
    zone: "Edu District",
    date: "2025-04-15",
    photo: null,
    comments: [],
    reportedBy: "Meera T.",
    verified: false,
    description:
      "Garbage pile outside primary school. Health hazard for children.",
  },

  {
    id: "i4",
    title: "Park trees not maintained",
    category: "greenery",
    status: "resolved",
    votes: 19,
    x: 410,
    y: 230,
    zone: "Green Belt",
    date: "2025-04-01",
    photo: null,
    comments: [
      {
        user: "Sunita R.",
        text: "Finally cleaned up!",
        time: "5d ago",
      },
    ],
    reportedBy: "Kavita P.",
    verified: true,
    description:
      "Overgrown trees blocking light. Park unusable in evenings.",
  },

  {
    id: "i5",
    title: "Unsafe construction debris on road",
    category: "safety",
    status: "in_progress",
    votes: 55,
    x: 280,
    y: 310,
    zone: "Residency",
    date: "2025-04-12",
    photo: null,
    comments: [
      {
        user: "Farhan Q.",
        text: "Two bikes fell here.",
        time: "1d ago",
      },
    ],
    reportedBy: "Arjun S.",
    verified: false,
    description:
      "Construction material dumped on the main road. Causing accidents.",
  },

  {
    id: "i6",
    title: "Clogged storm drain near temple",
    category: "sanitation",
    status: "new",
    votes: 22,
    x: 190,
    y: 130,
    zone: "Old City",
    date: "2025-04-16",
    photo: null,
    comments: [],
    reportedBy: "Lakshmi V.",
    verified: false,
    description:
      "Storm drain blocked with debris. Overflows during rain.",
  },

  {
    id: "i7",
    title: "Missing manhole cover on lane 7",
    category: "safety",
    status: "in_progress",
    votes: 38,
    x: 370,
    y: 290,
    zone: "Residency",
    date: "2025-04-09",
    photo: null,
    comments: [
      {
        user: "Deepak M.",
        text: "Very dangerous!",
        time: "4d ago",
      },
    ],
    reportedBy: "Neha G.",
    verified: false,
    description:
      "Open manhole. Child nearly fell in last week.",
  },

  {
    id: "i8",
    title: "Illegal hoarding blocking signals",
    category: "infrastructure",
    status: "resolved",
    votes: 14,
    x: 450,
    y: 160,
    zone: "NH-4 Corridor",
    date: "2025-03-28",
    photo: null,
    comments: [],
    reportedBy: "Vijay K.",
    verified: true,
    description:
      "Hoarding blocking traffic signal visibility at major intersection.",
  },
];