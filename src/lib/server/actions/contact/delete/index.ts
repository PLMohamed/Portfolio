"use server";

import { deleteFormById } from "@/db/queries";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import { revalidatePath } from "next/cache";
import z from "zod";
import { ClientError, createServerAction } from "../..";

const deleteFormActionSchema = z.tuple([
  z.uuid().nonempty("Id is required"),
  z.object({
    session: z.any(),
  }),
]);

const baseActionDeleteForm = async (
  id: z.infer<typeof deleteFormActionSchema>[0],
  _sessionObject: unknown,
) => {
  const form = await deleteFormById(id);

  if (!form) {
    throw new ClientError("Form not found");
  }

  revalidatePath("/admin/forms");

  return form;
};

const validatedDeleteForm = withActionValidator(
  baseActionDeleteForm,
  deleteFormActionSchema,
);

export const ActionDeleteForm = createServerAction(
  withAuthAction(validatedDeleteForm),
);
