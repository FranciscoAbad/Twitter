import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { ValidatedTextInput } from "../../../../components/ValidateInput/ValidatedTextInput";
import { countryCodeDropDown } from "../../utils/RegisterModalUtils";
import { validatePhone } from "../../../../services/validator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import "./RegisterForm.css";
import "../../../../assets/global.css";

export const RegisterFormFour: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDispatch = useDispatch();

  const [phoneCode, setPhoneCode] = useState<string>("+1");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [valid, setValid] = useState<boolean>(true);

  const changeCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneCode(e.target.value.split(" ")[0]);
  };
  const changePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    dispatch(updateRegister({ name: "phoneNumber", value: e.target.value }));
  };

  useEffect(() => {
    if (phoneNumber) {
      setValid(validatePhone(phoneNumber));
      dispatch(
        updateRegister({
          name: "phoneNumberValid",
          value: validatePhone(phoneNumber),
        })
      );
    }
  }, [phoneCode, phoneNumber]);

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-header-2">Add phone number</h1>
        <p className="register-text color-gray">
          Enter the phone number you would like to associate with your Twitter
          account. You won't get a verification code sent here.
        </p>
        <div
          className={
            valid
              ? "register-four-input-wrapper"
              : "register-four-input-wrapper-condensed"
          }
        >
          <DropDown
            content={countryCodeDropDown}
            change={changeCode}
            label={"Country Code"}
            defaultValue={"Argentina +54"}
          />
          <ValidatedTextInput
            valid={valid}
            name={"phoneNumber"}
            label={"Your phone number"}
            changeValue={changePhoneNumber}
          />
          {valid ? (
            <></>
          ) : (
            <p className="register-error color-red">
              Please enter a valid 10 numbers digit
            </p>
          )}
        </div>
        <div className="register-four-checkbox-wrapper">
          <p className="register-text color-gray">
            Let people who have your find and connect with you on Twitter.{" "}
            <span className="reg-step-four-link">Learn more</span>.
          </p>
          <Checkbox />
        </div>
        <div className="register-four-checkbox-wrapper">
          <p className="register-text color-gray">
            Let Twitter use your phone number to personalize our servicses,
            including ads (if permitted by your Ads preferences). If you don't
            enable this, Twitter will still use your phone number for purposes
            including account security, spam, fraud, and abuse prevention.
            <span className="register-link">
              See our Privacy Policy for more information.
            </span>
          </p>
          <Checkbox />
        </div>
      </div>
    </div>
  );
};
