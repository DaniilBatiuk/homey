import { createContext } from "react";

import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { userService } from "../services/user.service";

export const userContext = createContext<IUser | null>(null);

export const UserContext = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getUser(),
    retry: 1,
  });

  if (isFetching && !user) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <userContext.Provider value={user?.data && !isError ? user.data : null}>
      {children}
    </userContext.Provider>
  );
};
