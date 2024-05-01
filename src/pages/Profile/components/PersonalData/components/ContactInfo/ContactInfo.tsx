import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";

import { PersonalDataType } from "@/validators";

import { ButtonConfirm } from "@/components";

import { TextField } from "@mui/material";

import "./ContactInfo.scss";

type ContactInfoProp = {
  isLittleWidth: boolean;
  register: UseFormRegister<PersonalDataType>;
  errors: FieldErrors<PersonalDataType>;
  control: Control<PersonalDataType>;
};

export const ContactInfo: React.FC<ContactInfoProp> = ({
  isLittleWidth,
  register,
  errors,
  control,
}: ContactInfoProp) => {
  return (
    <div className="basic">
      <TextField
        label="Contact email"
        className="basic__text-field"
        error={Boolean(errors.contactEmail?.message)}
        helperText={errors.contactEmail?.message ? errors.contactEmail.message : ""}
        {...register("contactEmail")}
      />
      <Controller
        name="phoneNumber"
        control={control}
        rules={{ validate: value => matchIsValidTel(value) }}
        render={({ field: { ref: fieldRef, value, ...fieldProps }, fieldState }) => (
          <MuiTelInput
            className="basic__text-field"
            {...fieldProps}
            value={value ?? ""}
            inputRef={fieldRef}
            label="Enter your phone number"
            helperText={fieldState.invalid ? "Incorrect phone number" : ""}
            error={fieldState.invalid}
            defaultCountry="UA"
          />
        )}
      />
      <div className="basic__text">
        We respect your privacy, keep your data secure, use it only to communicate with you and do
        not pass it on to third parties without your consent.
      </div>
      {isLittleWidth && <ButtonConfirm text="Save" type="submit" />}
    </div>
  );
};
