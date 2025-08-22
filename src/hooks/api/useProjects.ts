"use client";

import { ClientError } from "@/lib/server/actions";
import {
  ActionCreateProject,
  ActionDeleteProject,
  ActionGetPublicProjects,
  ActionUpdateProject,
  ActionUpdateStatusProject,
} from "@/lib/server/actions/projects";
import { handleAction } from "@/lib/utils";
import { projectCreateValidator } from "@/lib/validators/project";
import { UpdateRequest } from "@/types/request";
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export function useInfiniteGetProjects(
  options?: Partial<
    UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getProjects>>,
      ClientError,
      InfiniteData<Awaited<ReturnType<typeof getProjects>>>,
      ["projects"],
      number
    >
  >,
) {
  async function getProjects({ pageParam = 1 }) {
    return await handleAction(ActionGetPublicProjects, {
      page: pageParam,
      limit: 10,
    });
  }

  return useInfiniteQuery({
    queryFn: getProjects,
    queryKey: ["projects"],
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentPage + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,

    ...options,
  });
}

export function useCreateProject(
  options?: Omit<
    UseMutationOptions<
      void,
      ClientError,
      z.infer<typeof projectCreateValidator>
    >,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  async function createProject(values: z.infer<typeof projectCreateValidator>) {
    return await handleAction(ActionCreateProject, values);
  }

  return useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while creating the project",
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    ...options,
  });
}

export function useUpdateProject(
  options?: Omit<
    UseMutationOptions<
      void,
      ClientError,
      UpdateRequest<z.infer<typeof projectCreateValidator>>
    >,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  async function createProject({
    values,
    id,
  }: UpdateRequest<z.infer<typeof projectCreateValidator>>) {
    return await handleAction(ActionUpdateProject, id, values);
  }

  return useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the project",
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    ...options,
  });
}

export function useDeleteProject(
  options?: Omit<UseMutationOptions<void, ClientError, string>, "mutationFn">,
) {
  const queryClient = useQueryClient();

  async function deleteProject(id: string) {
    await handleAction(ActionDeleteProject, id);
    return;
  }

  return useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while deleting the project",
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    ...options,
  });
}

export function useUpdateStatusProject(
  options?: Omit<
    UseMutationOptions<void, ClientError, UpdateRequest<boolean>>,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  async function updateStatusProject({ id, values }: UpdateRequest<boolean>) {
    return await handleAction(ActionUpdateStatusProject, id, values);
  }

  return useMutation({
    mutationFn: updateStatusProject,
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the project status",
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    ...options,
  });
}
