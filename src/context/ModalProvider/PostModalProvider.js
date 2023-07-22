"use client";
import { createContext, useContext, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  openModal: false,
  modalType: null,
  information: null,
};

export const ModalAPIContext = createContext();
export const ModalDataContext = createContext(INITIAL_STATE);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "OPEN":
      // console.log("OPEN: ", payload.information);
      return {
        openModal: true,
        modalType: payload.modalType,
        information: payload.information,
      };
    case "CLOSE":
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const data = {
    openModal: state.openModal,
    modalType: state.modalType,
    information: state.information,
  };

  const api = useMemo(() => {
    const onOpen = (modalType, information) => {
      // console.log("Provider: ", { modalType, information });
      dispatch({ type: "OPEN", payload: { modalType, information } });
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
