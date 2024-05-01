import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

export const DayjsDateSchema = z.custom<Dayjs>(value => {
  if (dayjs.isDayjs(value)) {
    return value;
  } else {
    throw new Error("Expected Dayjs object");
  }
});

export const PaymentDataFormScheme = z.object({
  cvv: z.string().regex(/^\d{3}$/, "CVV is not valid"),
  cardNumber: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card is not valid"),
  expireDate: DayjsDateSchema.nullable(),
});

export type PaymentDataType = z.infer<typeof PaymentDataFormScheme>;
