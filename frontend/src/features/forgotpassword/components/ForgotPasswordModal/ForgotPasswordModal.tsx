import React, { useState, useEffect } from "react";

import { Modal } from "../../../../components/Modal/Modal";
import { ForgotModalTop } from "../ForgotModalTop/ForgotModalTop";
import { ForgotFormOne } from "../ForgotForms/ForgotFormOne";
import { validEmail, validatePhone } from "../../../../services/validator";
import axios from "axios";
import { ForgotButtonOne } from "../ForgotButtons/ForgotButtonOne";
import { ForgotFormTwo } from "../ForgotForms/ForgotFormTwo";
import { ForgotButtonTwo } from "../ForgotButtons/ForgotButtonTwo";
import {
  determineForgotButton,
  determineForgotFormContent,
} from "../../utils/ForgotPasswordUtils";

interface UserInfo {
  email: string;
  phone: string;
  username: string;
}

export const ForgotPasswordModal: React.FC<{ toggleModal: () => void }> = ({
  toggleModal,
}) => {
  const [credential, setCredential] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [resetCode, setResetCode] = useState<number>(0);
  const [userInputCode, setUserInputCode] = useState<number>(0);
  const [newPassword, setNewPassword] = useState<Record<string, string>>({
    password: "",
    confirm: "",
  });
  const [matching, setMatching] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    phone: "",
    username: "",
  });

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (credential: string) => {
    setCredential(credential);
  };

  const changeUserInputCode = (value: number) => {
    setUserInputCode(value);
  };

  const searchUser = async () => {
    let findUserDTO = {
      email: "",
      phone: "",
      username: "",
    };

    if (validEmail(credential)) {
      findUserDTO = {
        ...findUserDTO,
        email: credential,
      };
    } else if (validatePhone(credential)) {
      findUserDTO = {
        ...findUserDTO,
        phone: credential,
      };
    } else {
      findUserDTO = {
        ...findUserDTO,
        username: credential,
      };
    }

    try {
      setError(false);
      let res = await axios.post(
        "http://localhost:8080/auth/identifiers",
        findUserDTO
      );
      let data = await res.data;
      setUserInfo({
        email: data.email,
        phone: data.phone,
        username: data.username,
      });
      setStep(2);
    } catch (e) {
      setError(true);
    }
  };

  const checkCode = () => {
    if (resetCode === userInputCode) {
      setStep(4);
    } else {
      setError(true);
    }
  };

  const sendReset = async () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setResetCode(code);

    try {
      let req = await axios.post("http://localhost:8080/auth/password/code", {
        email: userInfo.email,
        code,
      });
      let res = await req.data;
      setStep(3);
    } catch (e) {
      console.log(e);
    }
  };

  const sendPassword = async () => {
    let body = {
      username: userInfo.username,
      password: newPassword.password,
    };
    try {
      let req = await axios.put(
        "http://localhost:8080/auth/update/password",
        body
      );
      let res = await req.data;
      toggleModal();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (newPassword.password && newPassword.confirm) {
      setMatching(newPassword.password === newPassword.confirm);
    }
  }, [newPassword.password, newPassword.confirm]);

  return (
    <Modal
      topContent={<ForgotModalTop closeModal={toggleModal} />}
      content={determineForgotFormContent(
        step,
        handleChange,
        error,
        userInfo.email,
        userInfo.phone,
        !error,
        changeUserInputCode,
        updatePassword,
        matching
      )}
      bottomContent={determineForgotButton(
        step,
        credential,
        searchUser,
        sendReset,
        toggleModal,
        checkCode,
        () => {
          setStep(2);
        },
        userInputCode ? true : false,
        sendPassword,
        newPassword.password && newPassword.confirm && matching ? true : false
      )}
    />
  );
};
