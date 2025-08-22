"use client";

import { ClientError } from "@/lib/server/actions";
import {
  ActionCreateContact,
  ActionDeleteForm,
} from "@/lib/server/actions/contact";
import { handleAction } from "@/lib/utils";
import { formValidator } from "@/lib/validators/form";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export function useCreateContact(
  options?: Omit<
    UseMutationOptions<void, ClientError, z.infer<typeof formValidator>>,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  async function createContact(values: z.infer<typeof formValidator>) {
    return await handleAction(ActionCreateContact, values);
  }

  return useMutation({
    mutationFn: createContact,
    onError: (error) => {
      toast.error(error.message ?? "Error submitting the form");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
    ...options,
  });
}

export function useDeleteForm(
  options?: Omit<UseMutationOptions<void, ClientError, string>, "mutationFn">,
) {
  const queryClient = useQueryClient();

  async function deleteForm(id: string) {
    await handleAction(ActionDeleteForm, id);
    return;
  }

  return useMutation({
    mutationFn: deleteForm,
    onError: (error) => {
      toast.error(error.message || "An error occurred while deleting the form");
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
    ...options,
  });
}
