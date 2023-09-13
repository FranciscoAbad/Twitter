import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { ValidatedTextInput } from "../../../../components/ValidateInput/ValidatedTextInput";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import "./LoginFormOne.css";
import { ValidatedDisplay } from "../../../../components/ValidateInput/ValidatedDisplay";
import { useNavigate } from "react-router-dom";

interface LoginFormTwoProps {
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginFormTwo: React.FC<LoginFormTwoProps> = ({ setPassword }) => {
  const state = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const [active, setActive] = useState<boolean>(false);

  const toggleView = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (state.loggedIn) {
      navigate("/home");
      return () => {};
    }
  });

  return (
    <div className="login-form-two-container">
      <div className="login-form-content">
        <h1 className="login-form-header">Enter your password</h1>
        <ValidatedDisplay
          label={"username"}
          value={state.username}
          handleFocus={() => {}}
        />
        <div className="login-form-two-password">
          <ValidatedTextInput
            valid={!state.error}
            label={"Password"}
            name={"password"}
            changeValue={setPassword}
            attributes={{
              minLength: 8,
              type: active ? "text" : "password",
            }}
          />
          <div onClick={toggleView} className="login-form-two-password-icon">
            {active ? (
              <VisibilityOutlinedIcon
                sx={{
                  fontSize: "24px",
                }}
              />
            ) : (
              <VisibilityOutlinedIcon
                sx={{
                  fontSize: "24px",
                }}
              />
            )}
          </div>
          {state.error ? (
            <p className="login-form-error color-red">Invalid password</p>
          ) : (
            <></>
          )}
          <p className="login-form-two-forgot color-blue">Forgot password?</p>
        </div>
      </div>
    </div>
  );
};
