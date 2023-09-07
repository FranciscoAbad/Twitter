import styled from "styled-components/macro";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";

import { StyledNextButtonProps } from "../../../../utils/GlobalInterfaces";
import {
  incrementStep,
  registerUser,
  sendVerification,
  updatePassword,
  updateUserPhone,
} from "../../../../redux/Slices/RegisterSlice";

export const StyledNextButton = styled.button<StyledNextButtonProps>`
  width: 100%;
  height: 52px;
  color: white;
  font-size: 17px;
  background-color: ${(props) =>
    props.color === "blue"
      ? props.theme.colors.blue
      : props.theme.colors.black};
  opacity: ${(props) => (props.active ? 1.0 : 0.5)};
  border-radius: 50px;
  cursor: ${(props) => (props.active ? "pointer" : "auto")};
`;

interface RegisterNextButtonProps {
  step: number;
}

export const RegisterNextButton: React.FC<RegisterNextButtonProps> = ({
  step,
}) => {
  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDispatch = useDispatch();

  const sendUserInfo = () => {
    const user = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      dob: `${state.dob.year}-${
        state.dob.month < 10 ? `0${state.dob.month}` : state.dob.month
      }-${state.dob.day < 10 ? `0${state.dob.day}` : state.dob.day}`,
    };

    dispatch(registerUser(user));
  };

  const nextStep = () => {
    dispatch(incrementStep());
  };

  const sendPhoneNumber = () => {
    dispatch(
      updateUserPhone({
        username: state.username,
        phone: state.phoneNumber,
      })
    );
  };

  const verifyEmail = () => {
    dispatch(sendVerification({ username: state.username, code: state.code }));
  };

  const sendPassword = () => {
    dispatch(
      updatePassword({ username: state.username, password: state.password })
    );
  };
  const determineButtonContent = (step: number): JSX.Element => {
    switch (step) {
      case 1:
        let stepOneActive =
          state.dobValid &&
          state.emailValid &&
          state.firstNameValid &&
          state.lastNameValid;
        return (
          <StyledNextButton
            disabled={!stepOneActive}
            color={"black"}
            active={stepOneActive}
            onClick={nextStep}
          >
            Next
          </StyledNextButton>
        );
      case 2:
        return (
          <StyledNextButton color={"black"} active={true} onClick={nextStep}>
            Next
          </StyledNextButton>
        );
      case 3:
        return (
          <StyledNextButton color={"blue"} active={true} onClick={sendUserInfo}>
            Sign Up
          </StyledNextButton>
        );
      case 4:
        let stepFourActive =
          state.phoneNumber && state.phoneNumberValid ? true : false;
        return (
          <StyledNextButton
            disabled={!stepFourActive}
            color={"black"}
            active={stepFourActive}
            onClick={sendPhoneNumber}
          >
            Next
          </StyledNextButton>
        );
      case 5:
        return (
          <StyledNextButton
            active={state.code ? true : false}
            disabled={state.code ? false : true}
            color={"black"}
            onClick={verifyEmail}
          >
            Next
          </StyledNextButton>
        );
      case 6:
        return (
          <StyledNextButton
            active={state.password.length >= 8}
            disabled={!(state.password.length >= 8)}
            onClick={sendPassword}
            color={"black"}
          >
            Next
          </StyledNextButton>
        );
      default:
        return (
          <StyledNextButton
            disabled={false}
            color={"black"}
            active={false}
            onClick={() => {}}
          >
            {step}
          </StyledNextButton>
        );
    }
  };

  return determineButtonContent(step);
};
