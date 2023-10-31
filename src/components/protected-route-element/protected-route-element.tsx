import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import { currentUser } from "../../services/slices/authSlice";
import { FC, ReactElement } from "react";

type Props = {
  element: ReactElement;
};

export const ProtectedRouteElement: FC<Props> = ({ element }) => {
  const user = useAppSelector(currentUser);

  return user ? element : <Navigate to="/login" replace />;
};
