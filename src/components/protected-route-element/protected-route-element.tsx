import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import { currentUser } from "../../services/slices/authSlice";
import { FC, ReactElement } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  onlyUnAuth?: boolean;
  element: ReactElement;
};

export const ProtectedRouteElement: FC<Props> = ({
  onlyUnAuth = false,
  element,
}) => {
  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);
  const user = useAppSelector(currentUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};
