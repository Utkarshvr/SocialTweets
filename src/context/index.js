"use client";
import { SessionProvider } from "next-auth/react";
import ModalProvider from "./ModalProvider/PostModalProvider";
import RQProvider from "./RQProvider/RQProvider";

export default function Provider({ children }) {
  return (
    <SessionProvider>
      <RQProvider>
        <ModalProvider>{children}</ModalProvider>
      </RQProvider>
    </SessionProvider>
  );
}
