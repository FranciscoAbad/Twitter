import React,{useState,useEffect} from 'react'

import { StyledInputBox,StyledInputLabel } from './StyledInput'
import { Style } from '@mui/icons-material';
import { determineValidatedStyles } from '../../utils/DetermineStylesUtil';
import { ValidatedInputState } from '../../utils/GlobalInterfaces';
import './ValidatedInput.css'


interface ValidatedUserInputProps{
    name:string;
    label:string;
    errorMessage:string;
    validator(value:string):boolean;
    changeValue(e:React.ChangeEvent<HTMLInputElement>):void;
    attribute?:Record<string,string|number|boolean>;
}

export const ValidatedInput:React.FC<ValidatedUserInputProps> = ({
    name,label,errorMessage,validator,changeValue,attribute
}) => {

  const [validatedState,setValidatedState]=useState<ValidatedInputState>({
    active:false,
    valid:true,
    typedIn:false,
    labelActive:false,
    labelColor:"gray",
    value:""
  });

  useEffect(()=>{
    setValidatedState(determineValidatedStyles(validatedState,validator));
  },[validatedState.active,validatedState.typedIn,validatedState.value,validatedState.labelActive,validatedState.labelColor])
  const focus=(e:React.FocusEvent<HTMLInputElement>):void=>{
    setValidatedState({
      ...validatedState,
      active: !validatedState?.active
    });
    console.log(validatedState)
  }

  const updatedValue=(e:React.ChangeEvent<HTMLInputElement>)=>{
    
   setValidatedState({
    ...validatedState,
    typedIn:true,
    value:e.target.value
   })
   

   changeValue(e);
   console.log(validatedState)

   
  }
  
  return (
    <div className='validated-input'>
<StyledInputBox active={validatedState.active} valid={validatedState.valid}>
        <StyledInputLabel color={validatedState.labelColor} 
        active={validatedState.labelActive} valid={validatedState.valid}>
                        {label}                   
        </StyledInputLabel>
        <input className="validated-input-value"
                        name={name}
                        onFocus={focus}
                        onBlur={focus}
                        onChange={updatedValue}
                        />
    </StyledInputBox>

    {validatedState.valid?<></>:<span>{errorMessage}</span>}
    </div>
    
  )
}

