import { z } from "zod";

import { DayjsDateSchema } from "./payment-data-validation";

export const PersonalDataFormScheme = z.object({
  firstName: z.union([
    z.literal(""),
    z.string().max(25, "First name name must be less than 25 characters"),
  ]),
  surname: z.union([
    z.literal(""),
    z.string().max(25, "First name name must be less than 25 characters"),
  ]),
  gender: z.string().nullable(),
  dateOfBirth: DayjsDateSchema.nullable(),
  contactEmail: z.union([z.literal(""), z.string().email("Email is not valid")]),
  phoneNumber: z.string(),
});

export type PersonalDataType = z.infer<typeof PersonalDataFormScheme>;
