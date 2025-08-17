"use client";
import { ClientError } from "@/lib/server/actions";
import { ActionLogin, ActionMe, ActionSignup } from "@/lib/server/actions/auth";
import { handleAction } from "@/lib/utils";
import { loginValidator, signupValidator } from "@/lib/validators";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export function useSignup(
  options?: Omit<
    UseMutationOptions<void, ClientError, z.infer<typeof signupValidator>>,
    "mutationFn"
  >,
) {
  async function signup(values: z.infer<typeof signupValidator>) {
    return handleAction(ActionSignup, values);
  }

  return useMutation({
    mutationFn: signup,
    onError: (error) => {
      toast.error(error.message || "An error occurred during signup");
    },
    ...options,
  });
}

export function useLogin(
  options?: Omit<
    UseMutationOptions<void, ClientError, z.infer<typeof loginValidator>>,
    "mutationFn"
  >,
) {
  async function login(values: z.infer<typeof loginValidator>) {
    return handleAction(ActionLogin, values);
  }

  return useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message || "An error occurred during login");
    },
    ...options,
  });
}

export function useGetMe(
  options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof getMe>>>, "queryFn">,
) {
  async function getMe() {
    return await handleAction(ActionMe);
  }

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: 1,
    ...options,
  });
}
