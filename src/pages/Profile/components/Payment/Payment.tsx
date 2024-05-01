import clsx from "clsx";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

import { PaymentDataFormScheme, PaymentDataType } from "@/validators";

import { transformDate } from "@/helpers";

import { userContext } from "@/context";

import { userService } from "@/services";

import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import "./Payment.scss";

type PaymentProp = {
  isLittleWidth: boolean;
  activeMenuMobile: boolean;
};
export const Payment: React.FC<PaymentProp> = ({
  isLittleWidth,
  activeMenuMobile,
}: PaymentProp) => {
  const user = useContext(userContext);
  const queryClient = useQueryClient();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    setError,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PaymentDataType>({
    resolver: zodResolver(PaymentDataFormScheme),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (user) {
      reset({
        cardNumber: user.cardNumber ?? "",
        cvv: user.cvv ?? "",
        expireDate: dayjs(user.expireDate) ?? null,
      });
    }
  }, []);

  const { mutate } = useMutation({
    mutationFn: (data: IPaymentData) =>
      userService.setPaymentData({
        ...data,
      }),
    onSuccess() {
      toast.success("changes was saved successfully.");

      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  const { mutate: deleteCardInfo } = useMutation({
    mutationFn: () => userService.deletePaymentData(),
    onSuccess() {
      toast.success("changes was saved successfully.");

      queryClient.refetchQueries({
        queryKey: ["user"],
        type: "active",
        exact: true,
      });
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  const savePayment: SubmitHandler<PaymentDataType> = async data => {
    const date = transformDate(data.expireDate, true);

    if (date === "Date is incorrect" || !date) {
      setError("expireDate", { type: "custom", message: "Date is not correct" });
      return;
    }

    mutate({ ...data, expireDate: date });
  };

  return (
    <form
      onSubmit={handleSubmit(savePayment)}
      noValidate
      className={clsx("payment", {
        ["little"]: isLittleWidth,
      })}
      style={!isLittleWidth ? {} : activeMenuMobile ? {} : { display: "none" }}
    >
      <h1 className="payment__title">Change your security settings or delete your account</h1>
      <div className="payment__content" style={!isLittleWidth ? {} : { marginBottom: "0px" }}>
        <div className="payment__card-fields">
          <InputMask mask="9999 9999 9999 9999" maskChar=" " {...register("cardNumber")}>
            {
              ((inputProps: any) => {
                return (
                  <TextField
                    {...register("cardNumber")}
                    error={Boolean(errors.cardNumber?.message)}
                    helperText={errors.cardNumber?.message ? errors.cardNumber.message : ""}
                    {...inputProps}
                    label="Card number"
                    className="payment__field-card"
                  />
                );
              }) as any
            }
          </InputMask>

          <Controller
            name="expireDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label="Expiration"
                // @ts-ignore
                error={Boolean(errors.expireDate?.message)}
                helperText={errors.expireDate?.message ? errors.expireDate.message : ""}
                format="MM/YYYY"
                className="payment__expiration"
                onChange={date => field.onChange(date)}
              />
            )}
          />

          <TextField
            error={Boolean(errors.cvv?.message)}
            helperText={errors.cvv?.message ? errors.cvv.message : ""}
            {...register("cvv")}
            inputProps={{ maxLength: 3 }}
            label="CVV"
            className="payment__cvv"
          />
        </div>
        <div className="payment__buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={() => deleteCardInfo()}>
            Delete card data
          </button>
        </div>
      </div>
    </form>
  );
};
