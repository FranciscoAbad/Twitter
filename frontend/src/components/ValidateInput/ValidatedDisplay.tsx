import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { updateRegister } from "../../redux/Slices/RegisterSlice";
import { StyledInputBox, StyledInputLabel } from "./StyledInput";
import "./ValidatedInput.css";

interface ValidatedDisplayProps {
  label: string;
  value: string;
  valid?: boolean;
  handleFocus: () => void;
}

export const ValidatedDisplay: React.FC<ValidatedDisplayProps> = ({
  valid,
  label,
  value,
  handleFocus,
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="validated-input">
      <StyledInputBox
        active={false}
        valid={valid ? (!valid ? true : false) : true}
      >
        <StyledInputLabel
          color={focused ? "blue" : "gray"}
          active={!focused}
          valid={true}
        >
          {label}
        </StyledInputLabel>
        <input
          className="validated-input-value"
          onFocus={handleFocus}
          onChange={() => {}}
          value={value}
        />
      </StyledInputBox>
    </div>
  );
};
