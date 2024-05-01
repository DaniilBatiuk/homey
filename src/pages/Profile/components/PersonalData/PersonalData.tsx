import clsx from "clsx";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { PersonalDataFormScheme, PersonalDataType } from "@/validators";

import { ButtonConfirm } from "@/components";

import { transformDate } from "@/helpers";

import { userContext } from "@/context";

import { userService } from "@/services";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import "./PersonalData.scss";
import { Avatar } from "./components/Avatar/Avatar";
import { BasicInfo } from "./components/BasicInfo/BasicInfo";
import { ContactInfo } from "./components/ContactInfo/ContactInfo";

type PersonalDataProp = {
  isLittleWidth: boolean;
  activeMenuMobile: boolean;
};
export const PersonalData: React.FC<PersonalDataProp> = ({
  isLittleWidth,
  activeMenuMobile,
}: PersonalDataProp) => {
  const [activeMenu, setActiveMenu] = useState<number>(0);
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
  } = useForm<PersonalDataType>({
    resolver: zodResolver(PersonalDataFormScheme),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName ? user.firstName : "",
        surname: user.surname ? user.surname : "",
        gender: user.gender ? user.gender : "",
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        contactEmail: user.contactEmail ? user.contactEmail : "",
        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
      });
    }
  }, [user]);

  const { mutate } = useMutation({
    mutationFn: (data: IPersonalData) => userService.setUser(data),
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

  const saveProfile: SubmitHandler<PersonalDataType> = async data => {
    const date = transformDate(data.dateOfBirth);
    mutate({ ...data, dateOfBirth: date });
  };

  return (
    <form
      onSubmit={handleSubmit(saveProfile)}
      noValidate
      className={clsx("personal", {
        ["little"]: isLittleWidth,
      })}
      style={!activeMenuMobile && isLittleWidth ? { display: "none" } : {}}
    >
      <div
        className="personal__left"
        style={isLittleWidth && activeMenuMobile ? { display: "none" } : {}}
      >
        <div className="personal__card" style={isLittleWidth ? { marginInline: "20px" } : {}}>
          <div className="personal__card-info-main">
            <Avatar />
            <div className="personal__card__name">
              {user?.firstName || user?.surname ? `${user?.firstName} ${user?.surname}` : "User"}
            </div>
            <div className="personal__card__status">Guest</div>
          </div>
          <div className="personal__card__data">
            <div className="personal__card__list">
              <div className="personal__card__list-item">
                <div className="personal__card__list-item-text">
                  Comments <span>{user?.countOfComments}</span>
                </div>
              </div>
              <div className="personal__card__list-item">
                <div className="personal__card__list-item-text">
                  Active renting <span>{user?.countOfHouses}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ButtonConfirm text="Save" type="submit" style={{background: "#FF7924"}}/>
      </div>
      <div
        className={clsx("personal__right", {
          ["little"]: isLittleWidth,
        })}
      >
        <nav className="personal__right-nav">
          <div
            className={clsx("personal__right-nav-item", {
              ["active"]: activeMenu === 0,
            })}
            onClick={() => setActiveMenu(0)}
          >
            Basic info
          </div>
          <div
            className={clsx("personal__right-nav-item", {
              ["active"]: activeMenu === 1,
            })}
            onClick={() => setActiveMenu(1)}
          >
            Contact info
          </div>
        </nav>
        <div className="personal__right-content">
          {activeMenu === 0 && (
            <BasicInfo
              isLittleWidth={isLittleWidth}
              register={register}
              errors={errors}
              control={control}
            />
          )}
          {activeMenu === 1 && (
            <ContactInfo
              isLittleWidth={isLittleWidth}
              register={register}
              errors={errors}
              control={control}
            />
          )}
        </div>
      </div>
    </form>
  );
};
