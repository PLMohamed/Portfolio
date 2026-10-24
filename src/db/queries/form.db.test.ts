import { describeWithDatabase } from "@/test/describe-with-db";
import { expect, it } from "vitest";
import { FORM_SCHEMA } from "../schema";
import {
  createForm,
  deleteFormById,
  getFormById,
  updateFormById,
} from "./form";

await describeWithDatabase("form queries (database)", () => {
  it("stores a submission as unread by default", async () => {
    const created = await createForm({
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      subject: "Hello",
      message: "A message body.",
    });

    const form = await getFormById(created.insertedId, {
      id: FORM_SCHEMA.id,
      is_read: FORM_SCHEMA.is_read,
    });

    expect(form?.is_read).toBe(false);
  });

  it("can mark a submission as read and back", async () => {
    const { insertedId: id } = await createForm({
      fullName: "Ada",
      email: "ada@example.com",
      subject: "Hello",
      message: "A message body.",
    });

    await updateFormById(id, { is_read: true });
    const read = await getFormById(id, { is_read: FORM_SCHEMA.is_read });

    expect(read?.is_read).toBe(true);

    await updateFormById(id, { is_read: false });

    const unread = await getFormById(id, { is_read: FORM_SCHEMA.is_read });

    expect(unread?.is_read).toBe(false);
  });

  it("returns the deleted row when deleting a submission", async () => {
    const { insertedId } = await createForm({
      fullName: "Ada",
      email: "ada@example.com",
      subject: "Hello",
      message: "A message body.",
    });

    const deleted = await deleteFormById(insertedId);
    expect(deleted.deletedId).toBe(insertedId);

    expect(await getFormById(insertedId)).toBeNull();
  });
});
