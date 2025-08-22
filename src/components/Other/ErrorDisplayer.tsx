"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ErrorDisplayer() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return null;
}
