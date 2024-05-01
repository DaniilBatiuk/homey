import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ButtonConfirm, Modal } from "@/components";

import { ICONS } from "@/constants";

import { TextField } from "@mui/material";

import "./Support.scss";

type SupportProp = {
  activeModal: boolean;
  setActiveModal: (value: boolean) => void;
};

export const Support: React.FC<SupportProp> = ({ activeModal, setActiveModal }: SupportProp) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      text: "",
      telephone: "",
    },
  });

  const onSubmit = () => {
    toast.success("Report sent successfully.");
    setActiveModal(false);
  };

  return (
    <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
      <form onSubmit={handleSubmit(onSubmit)} className="modal-support">
        {ICONS.menuClose({ onClick: () => setActiveModal(false) })}
        <div className="modal-support__title">Customer support service</div>
        <div className="modal-support__subtitle">We're available 24 hours a day!</div>
        <div className="modal-support__text">
          If you have a problem with your booking, payment or availability, our support is here to
          help. Please provide details of the problem and we will get back to you.
        </div>
        <div className="modal-support__inputs">
          <TextField
            {...register("text", {
              required: "Field can not be empty",
            })}
            error={Boolean(errors.text?.message)}
            label="Describe the problem"
            helperText={errors.text?.message}
            multiline
            rows={4}
            fullWidth
          />
          <Controller
            name="telephone"
            control={control}
            rules={{ validate: value => matchIsValidTel(value) }}
            render={({ field: { ref: fieldRef, value, ...fieldProps }, fieldState }) => (
              <MuiTelInput
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
        </div>
        <ButtonConfirm text="Confirm" type="submit" style={{background: "#FF7924"}}/>
      </form>
    </Modal>
  );
};
