import { FieldErrors, UseFormRegister } from "react-hook-form";

import { TextField } from "@mui/material";

import "./Address.scss";

type addressProp = {
  register: UseFormRegister<ICreateHouse>;
  errors: FieldErrors<ICreateHouse>;
};

export const Address: React.FC<addressProp> = ({ register, errors }: addressProp) => {
  return (
    <div className="address__content">
      <h1 className="renting__title">Confirm the address</h1>
      <h2 className="renting__subtitle">
        Guests will only see the address once they have made a booking
      </h2>
      <div className="address__list">
        <TextField
          error={!!errors.address?.country?.message}
          helperText={errors.address?.country?.message ? errors?.address.country.message : ""}
          {...register("address.country")}
          label="Country/region*"
          fullWidth
        />
        <TextField
          error={Boolean(errors.address?.city?.message)}
          helperText={errors.address?.city?.message ? errors?.address?.city.message : ""}
          {...register("address.city")}
          label="City*"
          fullWidth
        />
        <TextField
          error={Boolean(errors.address?.addressLabel?.message)}
          helperText={
            errors.address?.addressLabel?.message ? errors?.address.addressLabel.message : ""
          }
          {...register("address.addressLabel")}
          label="Address"
          fullWidth
        />
      </div>
    </div>
  );
};
