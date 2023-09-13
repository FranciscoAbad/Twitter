import React from "react";
import { ValidatedDisplay } from "../../../../components/ValidateInput/ValidatedDisplay";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { stringifyDate } from "../../../../utils/DateUtils";
import { useDispatch } from "react-redux";
import "./RegisterForm.css";
import "../../../../assets/global.css";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
export const RegisterFormThree: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDispatch = useDispatch();
  const focus = () => {
    dispatch(
      updateRegister({
        name: "step",
        value: 1,
      })
    );
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-header">Create your account</h1>
        <div className="register-three-value-wrapper">
          <ValidatedDisplay
            label={"Name"}
            value={state.firstName + state.lastName}
            handleFocus={focus}
          />
          {state.error ? (
            <p className="register-error color-red">
              The email you specified is in use, please use a different one.
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="register-three-value-wrapper">
          <ValidatedDisplay
            label={"Email"}
            value={state.email}
            handleFocus={focus}
          />
        </div>
        <div
          className={
            state.error
              ? "register-three-value-wrapper"
              : "register-three-bottom"
          }
        >
          <ValidatedDisplay
            label={"Birth date"}
            value={stringifyDate(state.dob)}
            handleFocus={focus}
          />
        </div>
        <p className="register-text-sm color-gray">
          By signing up you agree our
          <span className="register-link color-blue">
            {" "}
            Tems of service
          </span> and{" "}
          <span className="register-link color-blue">Privacy policy</span>,
          including <span className="register-link color-blue">Cookie use</span>
          . Twitter may use your contact information including your email addres
          and phone number for purposes outlined in out Privacy Policy, like
          keeping your account secure and personalizing our services including
          ads. <span className="register-link color-blue">Learn more</span>.
          Others will by able to find you by email or phone number, when
          provided unless you chose otherwise
        </p>
      </div>
    </div>
  );
};
