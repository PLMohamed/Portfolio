"use client";

import { createContext, useContext } from "react";

interface FormsDialogContextType {
  deleteFormId: string | null;
  setDeleteFormId: (id: string | null) => void;
}

export const FormsDialogContext = createContext<
  FormsDialogContextType | undefined
>(undefined);

export function useFormsDialog() {
  const context = useContext(FormsDialogContext);

  if (!context) {
    throw new Error(
      "useFormsDialogContext must be used within a FormsDialogProvider",
    );
  }

  return context;
}
