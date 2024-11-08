import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(
  ...inputs: (string | undefined | false | null | Record<string, boolean>)[]
): string {
  return twMerge(clsx(...inputs));
}
