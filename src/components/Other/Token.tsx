"use client";

import { useRevalidateToken } from "@/hooks/api/useToken";

export default function TokenHandler() {
  useRevalidateToken({
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  return null;
}
