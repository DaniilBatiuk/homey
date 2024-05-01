import { z } from "zod";

export const ChangePasswordFormScheme = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters")
      .refine(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value), {
        message: "Password must contain at least 1 uppercase letter, lowercase letter, and symbol",
      }),
    oldPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters")
      .refine(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value), {
        message: "Password must contain at least 1 uppercase letter, lowercase letter, and symbol",
      }),
  })
  .refine(data => data.password !== data.oldPassword, {
    message: "Passwords match!",
    path: ["oldPassword"],
  });

export type ChangePasswordFormType = z.infer<typeof ChangePasswordFormScheme>;
