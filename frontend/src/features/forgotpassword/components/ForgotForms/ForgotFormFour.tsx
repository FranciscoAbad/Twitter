import React, { useState } from "react";
import { ValidatedTextInput } from "../../../../components/ValidateInput/ValidatedTextInput";
import "./ForgotForms.css";
import "../../../../assets/global.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface ForgotFormOneProps {
  updatePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  matching: boolean;
}

export const ForgotFormFour: React.FC<ForgotFormOneProps> = ({
  updatePassword,
  matching,
}) => {
  const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
  const [confirmToggle, setConfirmToggle] = useState<boolean>(false);

  const togglePassword = () => {
    setPasswordToggle(!passwordToggle);
  };

  const toggleConfirmPassword = () => {
    setConfirmToggle(!confirmToggle);
  };
  return (
    <div className="forgot-form-container">
      <h1 className="forgot-form-header">Choose a new password</h1>
      <p className="forgot-form-text color-gray">
        Make sure your new password is 8 characters or more. Try including
        numbers, letters, and punction marks for a{" "}
        <span className="link color-blue">strong password</span>
      </p>
      <p className="forgot-form-text color-gray">
        You'll be logged out of all active Twitter sessions after your password
        is changed.
      </p>
      <div className="forgot-form-four-password-wrapper">
        <ValidatedTextInput
          valid={true}
          label={"Password"}
          name={"password"}
          changeValue={updatePassword}
          attributes={{
            minLength: 8,
            type: passwordToggle ? "text" : "password",
          }}
        />
        <div
          onClick={togglePassword}
          className="forgot-form-four-password-icon"
        >
          {passwordToggle ? (
            <VisibilityOffOutlinedIcon
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
      </div>
      <div className="forgot-form-four-password-wrapper">
        <ValidatedTextInput
          valid={matching ? true : false}
          label={"Password"}
          name={"confirm"}
          changeValue={updatePassword}
          attributes={{
            minLength: 8,
            type: passwordToggle ? "text" : "password",
          }}
        />
        <div
          onClick={toggleConfirmPassword}
          className="forgot-form-four-password-icon"
        >
          {confirmToggle ? (
            <VisibilityOffOutlinedIcon
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
      </div>
      {!matching ? (
        <p className="login-form-error color-red">Passwords must match</p>
      ) : (
        <></>
      )}
    </div>
  );
};
