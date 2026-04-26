// src/context/AppContext.jsx

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

const AppCtx =
  createContext();

/* ---------------- STORAGE ---------------- */
const STORAGE_KEY =
  "issues";

/* ---------------- SEED ---------------- */
const SEED_ISSUES = [];

/* ---------------- LOAD ISSUES ---------------- */
function loadIssues() {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    return saved
      ? JSON.parse(saved)
      : SEED_ISSUES;
  } catch {
    return SEED_ISSUES;
  }
}

/* ---------------- INITIAL STATE ---------------- */
const initialState = {
  issues: loadIssues(),

  page: "home",

  isLoggedIn:
    localStorage.getItem(
      "currentUser"
    )
      ? true
      : false,

  currentUser:
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      ) || "null"
    ),

  userPoints: 420,
};

/* ---------------- REDUCER ---------------- */
function reducer(
  state,
  action
) {
  switch (
    action.type
  ) {
    /* PAGE */
    case "SET_PAGE":
      return {
        ...state,
        page:
          action.page,
      };

    /* LOGIN */
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        currentUser:
          action.user,
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
        currentUser:
          null,
        page: "home",
      };

    /* POINTS */
    case "SET_USER_POINTS":
      return {
        ...state,
        userPoints:
          state.userPoints +
          action.delta,
      };

    /* UPVOTE */
    case "UPVOTE_ISSUE": {
      const user =
        state.currentUser ||
        JSON.parse(
          localStorage.getItem(
            "currentUser"
          ) ||
            "null"
        );

      if (!user)
        return state;

      return {
        ...state,
        issues:
          state.issues.map(
            (
              issue
            ) => {
              if (
                String(
                  issue.id
                ) !==
                String(
                  action.id
                )
              )
                return issue;

              const voted =
                issue.votedUsers ||
                [];

              if (
                voted.includes(
                  user.email
                )
              ) {
                return issue;
              }

              return {
                ...issue,
                votes:
                  (issue.votes ||
                    0) +
                  1,
                votedUsers:
                  [
                    ...voted,
                    user.email,
                  ],
              };
            }
          ),
      };
    }

    /* ADD REPORT */
    case "ADD_ISSUE": {
      const newIssue = {
        id:
          Date.now().toString(),

        votes: 0,
        status: "new",
        votedUsers: [],

        ...action.payload,
      };

      return {
        ...state,
        issues: [
          newIssue,
          ...state.issues,
        ],
        page: "feed",
      };
    }

    /* DRAG STATUS */
    case "UPDATE_STATUS":
      return {
        ...state,
        issues:
          state.issues.map(
            (
              issue
            ) =>
              String(
                issue.id
              ) ===
              String(
                action.id
              )
                ? {
                    ...issue,
                    status:
                      action.status,
                  }
                : issue
          ),
      };

    default:
      return state;
  }
}

/* ---------------- PROVIDER ---------------- */
export function AppProvider({
  children,
}) {
  const [
    state,
    dispatch,
  ] = useReducer(
    reducer,
    initialState
  );

  /* AUTO SAVE REPORTS */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        state.issues
      )
    );
  }, [state.issues]);

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

/* ---------------- HOOK ---------------- */
export const useApp =
  () =>
    useContext(
      AppCtx
    );