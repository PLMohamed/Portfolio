"use server";

import { createForm } from "@/db/queries";
import { FormInsert } from "@/db/schema";
import {
  withActionValidator,
  withRatelimitAction,
} from "@/lib/server/wrappers";
import { formValidator } from "@/lib/validators/form";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createServerAction } from "../..";

const createContactActionSchema = z.tuple([formValidator]);

const baseActionCreateForm = async (request: z.infer<typeof formValidator>) => {
  const values: FormInsert = {
    fullName: request.fullName,
    email: request.email,
    subject: request.subject,
    message: request.message,
  };

  await createForm(values);

  revalidatePath("/admin/forms");

  return;
};

const validatedCreateForm = withActionValidator(
  baseActionCreateForm,
  createContactActionSchema,
);

export const ActionCreateForm = createServerAction(
  withRatelimitAction(validatedCreateForm, {
    key: "contact",
    limit: 2,
    duration: "10h",
    useIp: true,
  }),
);
