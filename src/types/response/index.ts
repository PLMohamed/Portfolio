export type APIResponse<T = Record<string, unknown>> = {
  message: string;
} & T;
