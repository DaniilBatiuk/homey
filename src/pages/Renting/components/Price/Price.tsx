import { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormControl, Input, InputAdornment } from "@mui/material";

import "./Price.scss";

type priceProp = {
  register: UseFormRegister<ICreateHouse>;
  errors: FieldErrors<ICreateHouse>;
};

export const Price: React.FC<priceProp> = ({ register, errors }: priceProp) => {
  return (
    <div className="price__content">
      <h1 className="renting__title">Set your price</h1>
      <h2 className="renting__subtitle">
        Select the rental price, with the option to change it at any time.
      </h2>
      <FormControl variant="standard" error={Boolean(errors.price?.message)}>
        <Input
          {...register("price")}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>

      <p>More about pricing</p>
    </div>
  );
};
