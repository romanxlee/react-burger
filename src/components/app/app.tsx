import AppStyles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";

import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
} from "../../pages";

function App() {
  return (
    <div className={AppStyles.app}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<Profile />} />}
          >
            <Route path="orders" element={<Profile />}>
              <Route path=":orderId" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
