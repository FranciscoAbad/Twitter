import { ForgotButtonFour } from "../components/ForgotButtons/ForgotButtonFour";
import { ForgotButtonOne } from "../components/ForgotButtons/ForgotButtonOne";
import { ForgotButtonThree } from "../components/ForgotButtons/ForgotButtonThree";
import { ForgotButtonTwo } from "../components/ForgotButtons/ForgotButtonTwo";
import { ForgotFormFour } from "../components/ForgotForms/ForgotFormFour";
import { ForgotFormOne } from "../components/ForgotForms/ForgotFormOne";
import { ForgotFormThree } from "../components/ForgotForms/ForgotFormThree";
import { ForgotFormTwo } from "../components/ForgotForms/ForgotFormTwo";

export const determineForgotFormContent = (
  step: number,
  setCredential: (value: string) => void,
  error: boolean,
  email: string,
  phone: string,
  valid: boolean,
  updateCode: (value: number) => void,
  updatePassword: (e: React.ChangeEvent<HTMLInputElement>) => void,
  matching: boolean
): JSX.Element => {
  switch (step) {
    case 1:
      return <ForgotFormOne setCredential={setCredential} error={error} />;
    case 2:
      return <ForgotFormTwo email={email} phone={phone} />;
    case 3:
      return <ForgotFormThree updateCode={updateCode} valid={valid} />;
    case 4:
      return (
        <ForgotFormFour updatePassword={updatePassword} matching={matching} />
      );
  }
  return <></>;
};

export const determineForgotButton = (
  step: number,
  credential: string,
  searchUser: () => void,
  sendCode: () => void,
  toggleModal: () => void,
  checkCode: () => void,
  back: () => void,
  formThreeActive: boolean,
  submitNewPassword: () => void,
  active: boolean
): JSX.Element => {
  switch (step) {
    case 1:
      return <ForgotButtonOne value={credential} handleClick={searchUser} />;
    case 2:
      return <ForgotButtonTwo onCancel={toggleModal} sendCode={sendCode} />;
    case 3:
      return (
        <ForgotButtonThree
          active={formThreeActive}
          checkCode={checkCode}
          back={back}
        />
      );
    case 4:
      return (
        <ForgotButtonFour
          submitNewPassword={submitNewPassword}
          active={active}
        />
      );
  }

  return <></>;
};
