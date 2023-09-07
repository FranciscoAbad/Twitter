import React, { useState, useEffect } from "react";
import { ValidatedTextInput } from "../../../../components/ValidateInput/ValidatedTextInput";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { useNavigate } from "react-router-dom";

import "./RegisterForm.css";
import "../../../../assets/global.css";

export const RegisterFormSix: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const [active, setActive] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    dispatch(updateRegister({ name: "password", value: e.target.value }));
  };

  const toggleView = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (state.login) {
      navigate("/home");
    }
  }, [state.login]);

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-header.2">You'll need a password</h1>
        <p className="register-text color-gray">
          Make sure it's 8 characters or more
        </p>
        <div className="register-six-password">
          <ValidatedTextInput
            valid={true}
            label={"Password"}
            name={"password"}
            changeValue={handleChange}
            attributes={{
              minLength: 8,
              type: active ? "text" : "password",
            }}
          />
          <div onClick={toggleView} className="register-six-icon">
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
        </div>
      </div>
    </div>
  );
};
