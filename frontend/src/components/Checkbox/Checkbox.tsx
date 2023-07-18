import React, { useState } from 'react'
import { StyledCheckbox,StyledCheckboxBackground } from './StyledCheckbox'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

export const Checkbox:React.FC = () => {

    const [clicked,setClicked]=useState<boolean>(false);

    const toggleCheckBox=()=>{
        setClicked(!clicked)
    }

  return (
    <StyledCheckboxBackground
    active={clicked}
    onClick={toggleCheckBox}
    >
        <StyledCheckbox active={clicked}>
            {clicked?<CheckRoundedIcon sx={{
                fontSize:18,
                color:"white"
            }}/>: <></>}
        </StyledCheckbox>

    </StyledCheckboxBackground>
  )
}

