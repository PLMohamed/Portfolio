"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, XIcon } from "lucide-react";
import Image from "next/image";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface FormMultiSelectOption {
  value: string;
  label: string;
  imageUrl?: string;
}

interface FormMultiSelectGroup {
  label: string;
  options: FormMultiSelectOption[];
}

interface FormMultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  groups: FormMultiSelectGroup[];
  containerClassName?: string;
}

function FormMultiSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  placeholder = "Select options",
  groups,
  containerClassName,
}: FormMultiSelectProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected: string[] = field.value ?? [];

        function toggle(value: string) {
          field.onChange(
            selected.includes(value)
              ? selected.filter((item) => item !== value)
              : [...selected, value],
          );
        }

        return (
          <FormItem className={cn(containerClassName)}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={undefined}
                    className="w-full flex-wrap justify-start gap-1"
                  >
                    {selected.length === 0 ? (
                      <span className="text-muted-foreground">
                        {placeholder}
                      </span>
                    ) : (
                      groups
                        .flatMap((group) => group.options)
                        .filter((option) => selected.includes(option.value))
                        .map((option) => (
                          <Badge key={option.value} variant="secondary">
                            {option.imageUrl && (
                              <Image
                                src={option.imageUrl}
                                alt=""
                                width={12}
                                height={12}
                              />
                            )}
                            {option.label}
                          </Badge>
                        ))
                    )}
                    <ChevronDownIcon className="ms-auto shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-(--radix-popover-trigger-width) p-0"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {groups.map((group) => (
                        <CommandGroup key={group.label} heading={group.label}>
                          {group.options.map((option) => (
                            <CommandItem
                              key={option.value}
                              value={option.value}
                              onSelect={() => toggle(option.value)}
                            >
                              <Checkbox
                                checked={selected.includes(option.value)}
                                aria-hidden
                                tabIndex={-1}
                              />
                              {option.imageUrl && (
                                <Image
                                  src={option.imageUrl}
                                  alt=""
                                  width={16}
                                  height={16}
                                />
                              )}
                              <span>{option.label}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            {selected.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground w-fit"
                onClick={() => field.onChange([])}
              >
                <XIcon />
                <span>Clear selection</span>
              </Button>
            )}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export { FormMultiSelect, type FormMultiSelectProps };
