import React, { useState } from "react";

import { Modal } from "../../../../components/Modal/Modal";
import "./LoginModal.css";
import { LoginModalTop } from "../LoginModalTop/LoginModalTop";
import { LoginFormOne } from "../LoginForms/LoginFormOne";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { LoginFormTwo } from "../LoginForms/LoginFormTwo";
import { LoginButton } from "../LoginButton/LoginButton";
interface LoginModalProps {
  toggleModal: () => void;
  toggleRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  toggleModal,
  toggleRegister,
}) => {
  const state = useSelector((state: RootState) => state.user);
  const [password, setPassword] = useState<string>("");

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const openRegister = () => {
    toggleModal();
    toggleRegister();
  };

  return (
    <Modal
      topContent={<LoginModalTop closeModal={toggleModal} />}
      content={
        state.username ? (
          <LoginFormTwo setPassword={handlePassword} />
        ) : (
          <LoginFormOne noAccount={openRegister} />
        )
      }
      bottomContent={
        state.username ? (
          <LoginButton username={state.username} password={password} />
        ) : (
          <></>
        )
      }
    />
  );
};
