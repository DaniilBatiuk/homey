type Field = {
  name: "address.country" | "address.city" | "address.addressLabel";
  message: string;
};

export const fieldsMessageError: Field[] = [
  { name: "address.country", message: "Country is not required" },
  { name: "address.city", message: "City is not required" },
  { name: "address.addressLabel", message: "Address is not required" },
];
