"use client";
import { createContext, useContext, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  openModal: false,
  payload: null,
};

export const ModalAPIContext = createContext();
export const ModalDataContext = createContext(INITIAL_STATE);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "OPEN":
      return { openModal: true, payload: payload };
    case "CLOSE":
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const data = { openModal: state.openModal, payload: state.payload };

  const api = useMemo(() => {
    const onOpen = (payload) => {
      dispatch({ type: "OPEN", payload: payload });
    };

    const onClose = () => {
      dispatch({ type: "CLOSE" });
    };

    return { onOpen, onClose };
  }, []);
  // Doesn't re-render even if state change, since "[]" means that it will only run the function given which returns us the api functions on first render

  return (
    <ModalAPIContext.Provider value={api}>
      <ModalDataContext.Provider value={data}>
        {children}
      </ModalDataContext.Provider>
    </ModalAPIContext.Provider>
  );
}

// Hooks
export const useModalAPI = () => useContext(ModalAPIContext);
export const useModalData = () => useContext(ModalDataContext);
