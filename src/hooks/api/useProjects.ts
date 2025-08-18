"use client";

import { ClientError } from "@/lib/server/actions";
import { ActionGetProjects } from "@/lib/server/actions/projects/read";
import { handleAction } from "@/lib/utils";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useGetProjects(
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProjects>>, ClientError>,
    "queryFn" | "queryKey"
  >,
) {
  async function getProjects() {
    return await handleAction(ActionGetProjects, {
      page: 1,
      limit: 10,
    });
  }

  return useQuery({
    queryFn: getProjects,
    queryKey: ["projects"],
    ...options,
  });
}
