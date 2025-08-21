import { APIResponse } from "@/types/response";
import "server-only";

export class ClientError extends Error implements APIResponse {
  [x: string]: unknown;

  constructor(message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "ClientError";
    if (details) {
      Object.assign(this, details);
    }
  }
}

export type ActionResponse<T> = ActionResponseError | ActionResponseSuccess<T>;

export interface ActionResponseError {
  error: APIResponse;
  data?: never;
}

export interface ActionResponseSuccess<T> {
  error?: never;
  data: T;
}

/**
 * Creates a server action that handles errors and returns a consistent response format.
 * This function wraps the provided function and catches any errors, returning them in a standardized format.
 * @param fn - The function to wrap, which should return a Promise.
 * @param T - The type of the arguments the function accepts.
 * @param U - The type of the data returned by the function.
 * @return A function that returns a Promise resolving to an ActionResponse.
 */
export function createServerAction<T extends unknown[], U>(
  fn: (...args: T) => Promise<U>,
): (...args: T) => Promise<ActionResponse<U>> {
  return async (...args: T) => {
    try {
      return { data: await fn(...args) };
    } catch (err: unknown) {
      if (err instanceof ClientError) {
        return {
          error: {
            message: err.message,
          },
        };
      }
      console.error("Action error:", err);
      throw new Error("Internal server error");
    }
  };
}
