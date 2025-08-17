import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ActionResponse } from "@/lib/server/actions";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleAction<T extends unknown[], U>(
  actionFn: (...args: T) => Promise<ActionResponse<U>>,
  ...args: T
): Promise<U> {
  try {
    const result = await actionFn(...args);

    if (result?.error) {
      throw result.error;
    }

    return result?.data;
  } catch (err: unknown) {
    if (isRedirectError(err)) return undefined as unknown as U; // safe for U = void

    throw err;
  }
}
