"use server";

import { updateFormById } from "@/db/queries";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createServerAction } from "../..";
import { ActionGetFormById } from "../read";

const updateStatusFormActionSchema = z.tuple([
  z.uuid().nonempty("Id is required"),
  z.boolean().nonoptional("Status is required"),
  z.object({
    session: z.any(),
  }),
]);

const baseActionUpdateStatusForm = async (
  id: z.infer<typeof updateStatusFormActionSchema>[0],
  status: z.infer<typeof updateStatusFormActionSchema>[1],
  _sessionObject: unknown,
) => {
  const { error } = await ActionGetFormById(id);

  if (error) {
    throw error;
  }

  await updateFormById(id, { is_read: status });

  revalidatePath("/admin/forms");
  revalidatePath("/admin/forms/" + id);
  revalidatePath("/");

  return;
};

const validatedUpdateStatusForm = withActionValidator(
  baseActionUpdateStatusForm,
  updateStatusFormActionSchema,
);

export const ActionUpdateStatusForm = createServerAction(
  withAuthAction(validatedUpdateStatusForm),
);
