"use server";

import { getFormById, getForms } from "@/db/queries";
import { FORM_SCHEMA, FormType } from "@/db/schema";
import { withActionValidator, withAuthAction } from "@/lib/server/wrappers";
import { formFilterValidator } from "@/lib/validators/form";
import { like, or, SQL } from "drizzle-orm";
import z from "zod";
import { ClientError, createServerAction } from "../..";

export type FormFilter = Partial<Omit<FormType, "id">>;

const getFormsActionSchema = z.tuple([
  formFilterValidator,
  z.object({
    session: z.any(),
  }),
]);

const baseActionGetForms = async (
  request: z.infer<typeof formFilterValidator>,
  _sessionObject: unknown,
) => {
  let condition: SQL | undefined;

  if (request.q) {
    condition = or(
      like(FORM_SCHEMA.subject, `%${request.q}%`),
      like(FORM_SCHEMA.email, `%${request.q}%`),
      like(FORM_SCHEMA.fullName, `%${request.q}%`),
    );
  }

  const forms = await getForms(
    {
      id: FORM_SCHEMA.id,
      fullName: FORM_SCHEMA.fullName,
      email: FORM_SCHEMA.email,
      subject: FORM_SCHEMA.subject,
      message: FORM_SCHEMA.message,
      is_read: FORM_SCHEMA.is_read,
      createdAt: FORM_SCHEMA.createdAt,
    },
    condition,
    {
      offset: (request.page - 1) * request.limit,
      limit: request.limit,
      orderBy: request.sortBy
        ? {
            column: FORM_SCHEMA[request.sortBy],
            direction: request.order,
          }
        : undefined,
    },
  );

  return forms;
};

const validatedGetForms = withActionValidator(
  baseActionGetForms,
  getFormsActionSchema,
);

export const ActionGetForms = createServerAction(
  withAuthAction(validatedGetForms),
);

const getFormByIdActionSchema = z.tuple([
  z.uuid().nonempty("Id is required"),
  z.object({
    session: z.any(),
  }),
]);

const baseActionGetFormById = async (
  id: z.infer<typeof getFormByIdActionSchema>[0],
  _sessionObject: unknown,
) => {
  const contact = await getFormById(id, {
    id: FORM_SCHEMA.id,
    subject: FORM_SCHEMA.subject,
    fullName: FORM_SCHEMA.fullName,
    email: FORM_SCHEMA.email,
    message: FORM_SCHEMA.message,
    createdAt: FORM_SCHEMA.createdAt,
    is_read: FORM_SCHEMA.is_read,
  });

  if (!contact) {
    throw new ClientError("Contact not found");
  }

  return contact;
};

const validatedGetFormById = withActionValidator(
  baseActionGetFormById,
  getFormByIdActionSchema,
);

export const ActionGetFormById = createServerAction(
  withAuthAction(validatedGetFormById),
);
