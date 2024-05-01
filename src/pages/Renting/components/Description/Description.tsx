import { FieldErrors, UseFormRegister } from "react-hook-form";

import { TextField } from "@mui/material";

import "./Description.scss";

type descriptionProp = {
  register: UseFormRegister<ICreateHouse>;
  errors: FieldErrors<ICreateHouse>;
};

export const Description: React.FC<descriptionProp> = ({ register, errors }: descriptionProp) => {
  return (
    <div className="name__content">
      <h1 className="renting__title">Come up with a description</h1>
      <h2 className="renting__subtitle">
        Describe the unique features of your guest accommodation
      </h2>
      <TextField
        {...register("description", {
          required: "Field can not be empty",
        })}
        error={Boolean(errors.description?.message)}
        helperText={errors.description?.message}
        multiline
        rows={8}
        fullWidth
      />
    </div>
  );
};
