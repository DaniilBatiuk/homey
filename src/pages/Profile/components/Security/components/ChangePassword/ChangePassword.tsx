import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ChangePasswordFormScheme, ChangePasswordFormType } from "@/validators";

import { ButtonConfirm, Modal } from "@/components";

import { ICONS } from "@/constants";

import { userService } from "@/services";

import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import "./ChangePassword.scss";

type ChangePasswordProp = {
  activeModal: boolean;
  setActiveModal: (value: boolean) => void;
};

export const ChangePassword: React.FC<ChangePasswordProp> = ({
  activeModal,
  setActiveModal,
}: ChangePasswordProp) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: ChangePasswordFormType) =>
      userService.setNewPassword({
        ...data,
      }),
    onSuccess() {
      setActiveModal(false);
      toast.success("changes was saved successfully.");
      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
    },
    onError(error: AxiosError<IError>) {
      toast.error(error.response?.data.error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordFormScheme),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      oldPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordFormType> = data => {
    mutate(data);
  };

  return (
    <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
      <form onSubmit={handleSubmit(onSubmit)} className="modal-support">
        {ICONS.menuClose({ onClick: () => setActiveModal(false) })}
        <div className="modal-support__title">Change password</div>
        <div className="modal-support__inputs">
          <TextField
            sx={{ width: "clamp(300px, 20vw, 350px)" }}
            {...register("oldPassword", {
              required: "Field can not be empty",
            })}
            error={Boolean(errors.oldPassword?.message)}
            label="Current password"
            helperText={errors.oldPassword?.message}
            fullWidth
            type="password"
          />
          <TextField
            sx={{ width: "clamp(300px, 20vw, 350px)" }}
            {...register("password", {
              required: "Field can not be empty",
            })}
            error={Boolean(errors.password?.message)}
            label="New password"
            helperText={errors.password?.message}
            fullWidth
            type="password"
          />
        </div>
        <ButtonConfirm text="Change" type="submit" style={{background: "#FF7924"}}/>
      </form>
    </Modal>
  );
};
