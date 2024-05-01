import { z } from "zod";

export const ConfirmEmailFormScheme = z.object({
  number1: z.string().max(1).min(1),
  number2: z.string().max(1).min(1),
  number3: z.string().max(1).min(1),
  number4: z.string().max(1).min(1),
  number5: z.string().max(1).min(1),
  number6: z.string().max(1).min(1),
});

export type ConfirmEmailFormType = z.infer<typeof ConfirmEmailFormScheme>;
