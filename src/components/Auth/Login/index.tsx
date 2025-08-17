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
import { useLogin } from "@/hooks/api/useAuth";
import { cn } from "@/lib/utils";
import { loginValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { push } = useRouter();
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginValidator>>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginValidator>) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Login successful");
        push("/admin");
      },
    });
  }

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
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

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Login
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
