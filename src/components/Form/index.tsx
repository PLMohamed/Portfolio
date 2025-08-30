"use client";

import { ActionResponseError } from "@/lib/server/actions";
import { ActionGetFormById } from "@/lib/server/actions/form";
import { FormInput } from "../ui/form/input";
import { FormTextarea } from "../ui/form/textarea";
import { useForm } from "react-hook-form";
import z from "zod";
import { formValidator } from "@/lib/validators/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { CircleCheckBigIcon, LoaderIcon } from "lucide-react";
import { useUpdateStatusForm } from "@/hooks/api/useForms";
import { toast } from "sonner";

type FormResponse = Exclude<
  Awaited<ReturnType<typeof ActionGetFormById>>,
  ActionResponseError
>["data"];

interface ContactFormProps {
  form: FormResponse;
}

export default function FormDisplay({ form: contact }: ContactFormProps) {
  const { mutate: updateStatus, isPending } = useUpdateStatusForm();

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
        {!contact.is_read && (
          <section className="flex flex-wrap items-center justify-end gap-4 max-sm:flex-col-reverse">
            <Button
              type="submit"
              className="max-sm:w-full"
              disabled={isPending}
              onClick={() =>
                updateStatus(
                  {
                    id: contact.id,
                    values: true,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Form marked as read successfully");
                    },
                  },
                )
              }
            >
              <span>Mark as read</span>
              {isPending ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                <CircleCheckBigIcon />
              )}
            </Button>
          </section>
        )}
      </div>
    </Form>
  );
}
