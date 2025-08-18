"use client";

import { ClientError } from "@/lib/server/actions";
import { ActionRevalidateToken } from "@/lib/server/actions/token";
import { handleAction } from "@/lib/utils";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useRevalidateToken(
  options?: Omit<UseQueryOptions<boolean, ClientError>, "queryFn" | "queryKey">,
) {
  async function revalidateToken() {
    await handleAction(ActionRevalidateToken);
    return true;
  }

  return useQuery({
    queryKey: ["revalidateToken"],
    queryFn: revalidateToken,
    ...options,
  });
}
