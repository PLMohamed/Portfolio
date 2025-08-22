"use client";

import { FormsDialogContext } from "@/contexts/FormsDialog";
import { useCallback, useState } from "react";

interface FormsDialogProps {
  children: React.ReactNode;
}

export default function FormsDialogProvider({ children }: FormsDialogProps) {
  const [deleteFormId, setDeleteFormId] = useState<string | null>(null);

  const handleDeleteFormId = useCallback((id: string | null) => {
    setDeleteFormId(id);
  }, []);

  return (
    <FormsDialogContext.Provider
      value={{ deleteFormId, setDeleteFormId: handleDeleteFormId }}
    >
      {children}
    </FormsDialogContext.Provider>
  );
}
