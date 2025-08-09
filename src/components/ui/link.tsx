import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import LinkComponent from "next/link";
import { Button, buttonVariants } from "./button";

function Link({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof LinkComponent> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  return (
    <Button
      className={cn(buttonVariants({ size, variant, className }))}
      asChild
    >
      <LinkComponent {...props} />
    </Button>
  );
}

export { Link };
