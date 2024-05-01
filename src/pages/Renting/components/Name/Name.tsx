import { FieldErrors, UseFormRegister } from "react-hook-form";

import { TextField } from "@mui/material";

import "./Name.scss";

type nameProp = {
  register: UseFormRegister<ICreateHouse>;
  errors: FieldErrors<ICreateHouse>;
};

export const Name: React.FC<nameProp> = ({ register, errors }: nameProp) => {
  return (
    <div className="name__content">
      <h1 className="renting__title">Think of a name for your place</h1>
      <h2 className="renting__subtitle">
        Define the uniqueness of your space with an eye-catching name
      </h2>
      <TextField
        {...register("name")}
        error={Boolean(errors.name?.message)}
        helperText={errors.name?.message}
        multiline
        rows={8}
        fullWidth
      />
    </div>
  );
};
