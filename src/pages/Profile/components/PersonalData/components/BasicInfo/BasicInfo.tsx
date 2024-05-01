import dayjs from "dayjs";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";

import { PersonalDataType } from "@/validators";

import { ButtonConfirm } from "@/components";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import "./BasicInfo.scss";

type BasicInfoProp = {
  isLittleWidth: boolean;
  register: UseFormRegister<PersonalDataType>;
  errors: FieldErrors<PersonalDataType>;
  control: Control<PersonalDataType>;
};

export const BasicInfo: React.FC<BasicInfoProp> = ({
  isLittleWidth,
  register,
  errors,
  control,
}: BasicInfoProp) => {
  return (
    <div className="basic">
      <TextField
        error={Boolean(errors.firstName?.message)}
        helperText={errors.firstName?.message ? errors.firstName.message : ""}
        {...register("firstName")}
        label="First name"
        className="basic__text-field"
      />
      <TextField
        error={Boolean(errors.surname?.message)}
        helperText={errors.surname?.message ? errors.surname.message : ""}
        {...register("surname")}
        label="Last name"
        className="basic__text-field"
      />
      <FormControl className="basic__text-field">
        <InputLabel>Select your gender</InputLabel>

        <Controller
          render={({ field: { onChange, value } }) => (
            <Select
              label="Select your gender"
              value={value ?? ""}
              onChange={date => onChange(date)}
              error={Boolean(errors.gender?.message)}
            >
              <MenuItem value={"Man"}>I am a man</MenuItem>
              <MenuItem value={"Woman"}>I am a woman</MenuItem>
              <MenuItem value={"Non-binary"}>I am a non-binary person</MenuItem>
              <MenuItem value={"Not to say"}>I prefer not to say</MenuItem>
            </Select>
          )}
          name={"gender"}
          control={control}
        />
      </FormControl>
      <Controller
        name={"dateOfBirth"}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            className="basic__text-field"
            value={value}
            onChange={date => onChange(date)}
            label="Date of birth"
            // @ts-ignore
            maxDate={dayjs()}
          />
        )}
      />
      {isLittleWidth && <ButtonConfirm text="Save" type="submit" />}
    </div>
  );
};
