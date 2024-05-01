import { useContext, useRef } from "react";
import { toast } from "react-toastify";

import { ICONS } from "@/constants";

import { userContext } from "@/context";

import { userService } from "@/services";

import Rectangle9 from "@/assets/images/Rectangle9.png";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import "../../PersonalData.scss";

export const Avatar: React.FC = () => {
  const queryClient = useQueryClient();
  const filePicker = useRef<HTMLInputElement>(null);
  const user = useContext(userContext);

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => userService.setProfileImage(data),
    onSuccess() {
      toast.success("image was saved successfully.");

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    mutate(formData);
  };

  return (
    <div className="personal__card__avatar">
      <img src={user?.imagePath ? user.imagePath : Rectangle9} alt="avatar" />
      <span
        onClick={() => {
          if (filePicker && filePicker.current) {
            filePicker.current.click();
          }
        }}
      >
        {ICONS.photo()}
        <input
          ref={filePicker}
          type="file"
          accept="image/*,.png,.jpg,.gif,.web,"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </span>
    </div>
  );
};
