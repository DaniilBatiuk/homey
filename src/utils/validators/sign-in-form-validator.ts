import { z } from "zod";

export const SignInFormScheme = z.object({
  email: z.string().email("Email is not valid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .refine(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value), {
      message: "Password must contain at least 1 uppercase letter, lowercase letter, and symbol",
    }),
});

export type SignInFormType = z.infer<typeof SignInFormScheme>;
