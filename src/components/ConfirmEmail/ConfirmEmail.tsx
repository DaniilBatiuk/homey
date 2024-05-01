import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ConfirmEmailFormScheme, ConfirmEmailFormType } from "@/validators";

import { ICONS } from "@/constants";

import { saveTokensStorage } from "@/services";

import { LINKS } from "@/config/pages-url.config";

import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import "./ConfirmEmail.scss";

import { ButtonConfirm } from "../UI/ButtonConfirm/ButtonConfirm";

type ConfirmEmailType = {
  tokens: IAuthResponse | null;
};

export const ConfirmEmail: React.FC<ConfirmEmailType> = ({ tokens }: ConfirmEmailType) => {
  const navigate = useNavigate();
  const textInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmEmailFormType>({
    resolver: zodResolver(ConfirmEmailFormScheme),
    mode: "onSubmit",
  });

  const handleClick = (num: number) => {
    if (num !== 5 && textInputRefs?.current[num]?.value !== "") {
      textInputRefs?.current[num + 1]?.focus();
    }
  };

  const ConfirmEmailFunc: SubmitHandler<ConfirmEmailFormType> = async data => {
    const confirmPassword = Object.values(data).join("");
    if (confirmPassword === "123456" && tokens) {
      saveTokensStorage(tokens.accessToken, tokens.refreshToken);

      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
      navigate(LINKS.HOME);
    } else {
      toast.error("Wrong confirm code!");
    }
  };

  return (
    <form onSubmit={handleSubmit(ConfirmEmailFunc)} className="login__text-half">
      {ICONS.menuClose({ onClick: () => navigate(LINKS.HOME) })}
      <Link to={LINKS.SIGNUP} className="login__img-link login__img-link-phone">
        Sign up{ICONS.cardArrow()}
      </Link>
      <div className="login__subtitle">Confirm Email</div>
      <div className="login__text">
        Your confirmation code has been sent to your Email. Please enter your verification code
      </div>
      <div className="login__fields-list confirm-email__fields">
        <TextField
          sx={{
            m: 1,
            width: "60px",
            "& input": {
              textAlign: "center",
            },
          }}
          {...register("number1")}
          inputProps={{ maxLength: 1 }}
          error={Boolean(errors.number1?.message)}
          onChange={() => handleClick(0)}
          inputRef={element => (textInputRefs.current[0] = element)}
        />
        <TextField
          sx={{
            m: 1,
            width: "60px",
            "& input": {
              textAlign: "center",
            },
          }}
          {...register("number2")}
          inputProps={{ maxLength: 1 }}
          error={Boolean(errors.number2?.message)}
          onChange={() => handleClick(1)}
          inputRef={element => (textInputRefs.current[1] = element)}
        />
        <TextField
          sx={{
            m: 1,
            width: "60px",
            "& input": {
              textAlign: "center",
            },
          }}
          {...register("number3")}
          inputProps={{ maxLength: 1 }}
          error={Boolean(errors.number3?.message)}
          onChange={() => handleClick(2)}
          inputRef={element => (textInputRefs.current[2] = element)}
        />
        <TextField
          sx={{
            m: 1,
            width: "60px",
            "& input": {
              textAlign: "center",
            },
          }}
          {...register("number4")}
          inputProps={{ maxLength: 1 }}
          error={Boolean(errors.number4?.message)}
          onChange={() => handleClick(3)}
          inputRef={element => (textInputRefs.current[3] = element)}
        />
        <TextField
          sx={{
            m: 1,
            width: "60px",
            "& input": {
              textAlign: "center",
            },
          }}
          {...register("number5")}
          inputProps={{ maxLength: 1 }}
          error={Boolean(errors.number5?.message)}
          onChange={() => handleClick(4)}
          inputRef={element => (textInputRefs.current[4] = element)}
        />
        <TextField
          sx={{
            m: 1,
            width: "60px",
            "& input": {
              textAlign: "center",
            },
          }}
          {...register("number6")}
          inputProps={{ maxLength: 1 }}
          error={Boolean(errors.number6?.message)}
          onChange={() => handleClick(5)}
          inputRef={element => (textInputRefs.current[5] = element)}
        />
      </div>
      <div className="confirm-email__new-code">Submit new code</div>
      <ButtonConfirm text="Continue" type="submit" style={{background: "#9A041F"}}/>
    </form>
  );
};
