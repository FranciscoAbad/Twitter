import React from "react";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import "./ForgotRadioButton.css";

interface ForgotRadioStyledProps {
  clicked: boolean;
}

export const StyledRadio = styled.input<ForgotRadioStyledProps>`
  -webkit-appearance: none;
  appearance: none;
  background-color: ${(props) =>
    props.clicked ? props.theme.colors.blue : "white"};
  margin: 0;
  color: white;
  width: 20px;
  height: 20px;
  border: ${(props) =>
    props.clicked ? "none" : `2px solid ${props.theme.colors.darkGray}`};
  border-radius: 50%;
`;

export const StyledRadioDiv = styled.div<ForgotRadioStyledProps>`
  height: 36px;
  width: 36px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  &:hover {
    background-color: ${(props) =>
      props.clicked ? "rgba(29,155,249,0.1)" : "rgba(83,100,113,0.1)"};
  }
`;

interface ForgotRadioButtonProps {
  clicked: boolean;
  handleClick: () => void;
}

export const ForgotRadioButton: React.FC<ForgotRadioButtonProps> = ({
  clicked,
  handleClick,
}) => {
  return (
    <StyledRadioDiv clicked={clicked} onClick={handleClick}>
      <StyledRadio clicked={clicked} type="radio"></StyledRadio>
      <div className="forgot-radio-checkmark">
        {clicked ? (
          <CheckIcon
            sx={{
              color: "white",
              fontSize: "14px",
              fontWeight: 300,
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </StyledRadioDiv>
  );
};
