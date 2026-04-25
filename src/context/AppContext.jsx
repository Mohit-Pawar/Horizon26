// src/context/AppContext.jsx

import React, {
  createContext,
  useContext,
  useReducer,
} from "react";

const SEED_ISSUES = [];

const AppCtx = createContext();

const initialState = {
  issues: SEED_ISSUES,
  page: "home",

  /* IMPORTANT */
  isLoggedIn:
    localStorage.getItem(
      "currentUser"
    )
      ? true
      : false,

  currentUser: JSON.parse(
    localStorage.getItem(
      "currentUser"
    ) || "null"
  ),

  userPoints: 420,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };

    /* LOGIN FIX */
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.user,
        page: "feed",
      };

    /* LOGOUT */
    case "LOGOUT":
      localStorage.removeItem(
        "currentUser"
      );

      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
        page: "home",
      };

    case "SET_USER_POINTS":
      return {
        ...state,
        userPoints:
          state.userPoints +
          action.delta,
      };
      case "UPVOTE_ISSUE": {
  const currentUser =
    state.currentUser ||
    JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

  if (!currentUser) return state;

  return {
    ...state,
    issues: state.issues.map((issue) => {
      if (issue.id !== action.id)
        return issue;

      const votedUsers =
        issue.votedUsers || [];

      /* already voted */
      if (
        votedUsers.includes(
          currentUser.email
        )
      ) {
        return issue;
      }

      return {
        ...issue,
        votes: issue.votes + 1,
        votedUsers: [
          ...votedUsers,
          currentUser.email,
        ],
      };
    }),
  };
}
case "ADD_ISSUE": {
  const newIssue = {
    id: Date.now(),
    ...action.payload,
  };

  const updatedIssues = [
    newIssue,
    ...state.issues,
  ];

  /* save reports */
  localStorage.setItem(
    "issues",
    JSON.stringify(updatedIssues)
  );

  return {
    ...state,
    issues: updatedIssues,
    page: "feed",
  };
}
const savedIssues = JSON.parse(
  localStorage.getItem("issues") || "null"
);

const initialState = {
  issues: savedIssues || SEED_ISSUES,
  page: "home",
  isLoggedIn: false,
  currentUser: null,
  userPoints: 420,
};
case "UPDATE_STATUS":
  return {
    ...state,
    issues: state.issues.map(
      (item) =>
        item.id === action.id
          ? {
              ...item,
              status: action.status,
            }
          : item
    ),
  };
    default:
      return state;
  }
}

export function AppProvider({
  children,
}) {
  const [state, dispatch] =
    useReducer(
      reducer,
      initialState
    );

  return (
    <AppCtx.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export const useApp = () =>
  useContext(AppCtx);