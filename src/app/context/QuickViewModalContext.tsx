"use client";
import React, { createContext, useContext, useState } from "react";

interface QuickViewModalContextType {
  isQuickViewModalOpen: boolean;
  openQuickViewModal: () => void;
  closeQuickViewModal: () => void;
}

const QuickViewModalContext = createContext<
  QuickViewModalContextType | undefined
>(undefined);

export const useQuickViewModalContext = () => {
  const context = useContext(QuickViewModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export const QuickViewModalProvider = ({ children }) => {
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false);

  const openQuickViewModal = () => {
    setIsQuickViewModalOpen(true);
  };

  const closeQuickViewModal = () => {
    setIsQuickViewModalOpen(false);
  };

  return (
    <QuickViewModalContext.Provider
      value={{ isQuickViewModalOpen, openQuickViewModal, closeQuickViewModal }}
    >
      {children}
    </QuickViewModalContext.Provider>
  );
};
