import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignUpFormType } from "src/utils/validators/sign-up-form-validator";

import { SignInFormScheme, SignInFormType } from "@/validators";

import { ButtonConfirm, ConfirmEmail } from "@/components";

import { ICONS } from "@/constants";

import { authService, saveTokensStorage } from "@/services";

import SingIn from "@/assets/images/SingIn.png";

import { LINKS } from "@/config/pages-url.config";

import { withAuth } from "@/HOC/withAuth";

import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import "./SignIn.scss";

export const SignIn: React.FC = withAuth(() => {
  const navigate = useNavigate();
  const [confirmEmailActive, setConfirmEmailActive] = useState<boolean>(false);
  const [tokens, setTokens] = useState<IAuthResponse | null>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({ resolver: zodResolver(SignInFormScheme), mode: "onSubmit" });

  const { mutate } = useMutation({
    mutationFn: (data: IAuthLogin) =>
      authService.login({
        ...data,
      }),
    onSuccess({ data }) {
      setTokens(data);
      setConfirmEmailActive(true);
    },
  });

  const { mutate: googleLoginMutate } = useMutation({
    mutationFn: (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) =>
      authService.loginGoogle({
        ...tokenResponse,
      }),
    onSuccess({ data }) {
      saveTokensStorage(data.accessToken, data.refreshToken);
      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
      navigate(LINKS.HOME);
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      googleLoginMutate(tokenResponse);
    },
  });

  const SignInUser: SubmitHandler<SignInFormType> = async data => {
    mutate(data);
  };

  return (
    <section className="login">
      <div className="login__img-half">
        <img src={SingIn} alt="sing_in" className="login__img" />
        <Link to={LINKS.SIGNUP} className="login__img-link">
          Sign up{ICONS.cardArrow()}
        </Link>
      </div>
      {!confirmEmailActive ? (
        <form onSubmit={handleSubmit(SignInUser)} className="login__text-half">
          {ICONS.menuClose({ onClick: () => navigate(LINKS.HOME) })}
          <Link to={LINKS.SIGNUP} className="login__img-link login__img-link-phone">
            Sign up{ICONS.cardArrow()}
          </Link>
          <div className="login__title">Sign in</div>
          <div className="login__subtitle">Welcome back to Homey!</div>
          <div className="login__text">
            Enter your credentials to continue using our services and get access to the best rental
            deals.
          </div>
          <div className="login__fields-list">
            <div className="login__list-item">
              <TextField
                {...register("email")}
                error={Boolean(errors.email?.message)}
                label="Enter your Email"
                helperText={errors.email?.message}
                fullWidth
              />
            </div>
            <div className="login__list-item">
              <TextField
                {...register("password")}
                error={Boolean(errors.password?.message)}
                label="Enter password"
                helperText={errors.password?.message}
                fullWidth
                type="password"
              />
            </div>
          </div>
          <ButtonConfirm text="Continue" type="submit" style={{ background: "#9A041F" }} />
          <div className="login__or">or</div>
          <div className="login__icons-list">{ICONS.gmail({ onClick: googleLogin })}</div>
        </form>
      ) : (
        <ConfirmEmail tokens={tokens} />
      )}
    </section>
  );
});
