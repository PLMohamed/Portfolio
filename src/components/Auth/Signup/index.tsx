"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form/input";
import { useSignup } from "@/hooks/api/useAuth";
import { cn } from "@/lib/utils";
import { signupValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { push } = useRouter();
  const { mutate, isPending } = useSignup();

  const form = useForm<z.infer<typeof signupValidator>>({
    resolver: zodResolver(signupValidator),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof signupValidator>) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        push("/auth/login");
      },
    });
  }

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Fill in the details below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormInput
                  control={form.control}
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
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
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />

                <FormInput
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Sign Up
                    {isPending && <LoaderIcon className="animate-spin" />}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
