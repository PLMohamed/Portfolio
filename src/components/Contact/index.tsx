"use client";

import { formValidator } from "@/lib/validators/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "../ui/form";
import { Card, CardContent } from "../ui/card";
import { FormInput } from "../ui/form/input";
import { FormTextarea } from "../ui/form/textarea";
import { Button } from "../ui/button";
import { LoaderIcon, SendIcon } from "lucide-react";
import { useCreateForm } from "@/hooks/api/useForms";
import { toast } from "sonner";

export default function ContactForm() {
  const { mutate, isPending } = useCreateForm();

  const form = useForm<z.infer<typeof formValidator>>({
    resolver: zodResolver(formValidator),
    defaultValues: {
      email: "",
      fullName: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formValidator>) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Form submitted successfully!");
        form.reset();
      },
    });
  }

  return (
    <Card className="xl:col-span-2">
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
              <FormInput
                control={form.control}
                name="fullName"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                required
              />

              <FormInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />

              <FormInput
                control={form.control}
                name="subject"
                label="Subject"
                type="text"
                placeholder="Enter the subject"
                containerClassName="lg:col-span-2"
                required
              />

              <FormTextarea
                control={form.control}
                name="message"
                label="Message"
                placeholder="Enter your message"
                containerClassName="lg:col-span-2"
                className="min-h-40 resize-none"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                <span>Send Message</span>
                {isPending ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  <SendIcon />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
