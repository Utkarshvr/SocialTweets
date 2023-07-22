"use client";
import { createContext, useContext, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  showComments: false,
  information: null,
};

export const CommentsAPIContext = createContext();
export const CommentsDataContext = createContext(INITIAL_STATE);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "OPEN":
      // console.log("OPEN: ", payload.information);
      return {
        showComments: true,
        information: payload.information,
      };
    case "CLOSE":
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default function CommentsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const data = {
    showComments: state.showComments,
    information: state.information,
  };

  const api = useMemo(() => {
    const onOpen = (information) => {
      // console.log("Provider: ", {  information });
      dispatch({ type: "OPEN", payload: { information } });
    };

    const onClose = () => {
      dispatch({ type: "CLOSE" });
    };

    return { onOpen, onClose };
  }, []);
  // Doesn't re-render even if state change, since "[]" means that it will only run the function given which returns us the api functions on first render

  return (
    <CommentsAPIContext.Provider value={api}>
      <CommentsDataContext.Provider value={data}>
        {children}
      </CommentsDataContext.Provider>
    </CommentsAPIContext.Provider>
  );
}

// Hooks
export const useCommentsAPI = () => useContext(CommentsAPIContext);
export const useCommentsData = () => useContext(CommentsDataContext);
