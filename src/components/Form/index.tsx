"use client";

import { ActionResponseError } from "@/lib/server/actions";
import { ActionGetContactById } from "@/lib/server/actions/contact";
import { FormInput } from "../ui/form/input";
import { FormTextarea } from "../ui/form/textarea";
import { useForm } from "react-hook-form";
import z from "zod";
import { formValidator } from "@/lib/validators/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";

type FormResponse = Exclude<
  Awaited<ReturnType<typeof ActionGetContactById>>,
  ActionResponseError
>["data"];

interface ContactFormProps {
  form: FormResponse;
}

export default function FormDisplay({ form: contact }: ContactFormProps) {
  const form = useForm<z.infer<typeof formValidator>>({
    resolver: zodResolver(formValidator),
    defaultValues: {
      email: contact.email,
      fullName: contact.fullName,
      message: contact.message,
      subject: contact.subject,
    },
  });

  return (
    <Form {...form}>
      <div className="space-y-4">
        <section className="grid grid-cols-1 items-start gap-x-8 gap-y-4 md:grid-cols-2">
          <FormInput
            control={form.control}
            name="fullName"
            label="Full Name"
            readOnly
          />
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            type="email"
            readOnly
          />
          <FormInput
            control={form.control}
            name="subject"
            label="Subject"
            containerClassName="md:col-span-2"
            readOnly
          />

          <FormTextarea
            control={form.control}
            name="message"
            label="Message"
            containerClassName="md:col-span-2"
            className="min-h-52 resize-none"
            readOnly
          />
        </section>
      </div>
    </Form>
  );
}
