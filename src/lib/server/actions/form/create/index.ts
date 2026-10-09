"use server";

import { createForm } from "@/db/queries";
import { FormInsert } from "@/db/schema";
import { getClientIP } from "@/lib/server/helpers";
import { notifyNewContactForm } from "@/lib/server/services";
import {
  withActionValidator,
  withRatelimitAction,
} from "@/lib/server/wrappers";
import { formValidator } from "@/lib/validators/form";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { after } from "next/server";
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

  // Read request data before scheduling, then notify outside the response path
  // so a slow or failing Discord webhook never delays the visitor.
  const ip = getClientIP(await headers());

  after(async () => {
    try {
      await notifyNewContactForm({ ...request, ip });
    } catch (error) {
      console.error("Failed to send Discord notification:", error);
    }
  });

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
