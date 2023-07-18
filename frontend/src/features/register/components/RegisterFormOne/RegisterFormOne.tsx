import React,{useState,useEffect,} from 'react'

import './RegisterFormOne.css'

import { TextInput } from '../../../../components/TextInput/TextInput'
import { ValidatedInput } from '../../../../components/ValidateInput/ValidatedInput'
import { validateName } from '../../../../services/validator'
import { RegisterDateInput } from '../RegisterDateInput/RegisterDateInput'
import { ValidatedTextInput } from '../../../../components/ValidateInput/ValidatedTextInput'
import { RegisterNameInput } from '../RegisterNameInput/RegisterNameInput'
import { RegisterEmailInput } from '../RegisterEmailInput/RegisterEmailInput'
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/Store'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../redux/Store'
import { incrementStep, updateRegister } from '../../../../redux/Slices/RegisterSlice'




export const RegisterFormOne:React.FC = () => {

   const registerState=useSelector((state:RootState)=>state.register)
   const dispatcher:AppDispatch=useDispatch();

    const [buttonActive,setButtonActive]=useState<boolean>(false);

    const nextPage=():void=>{
        dispatcher(updateRegister({
          name:"error",
          value:false
        }))

        dispatcher(incrementStep());
    }

   useEffect(() => {
     if(registerState.dobValid && registerState.emailValid && registerState.firstNameValid && registerState.lastNameValid){
        setButtonActive(true);
     }else{
        setButtonActive(false);
     }
   }, [registerState])
   

   
    
  return (
    <div className="reg-step-one-container">
        <div className="reg-step-one-content">
          <h1 className='reg-step-one-header'>Create your account</h1>
             <RegisterNameInput firstName={registerState.firstName} lastName={registerState.lastName}/>
             <RegisterEmailInput email={registerState.email}/>
          <div className='reg-step-one-dob-disclaimer'>
            <p className='reg-step-one-dob-header'>Date of Birth</p>
            <span className='reg-step-one-dob-text'>
              This will not be shown publicly. Confirm your own age, even if this account is for a business, pet, or something ese.
            </span>
          </div>
            <RegisterDateInput date={registerState.dob}/>
            <StyledNextButton
            disabled={!buttonActive}
            color={"black"}
            active={buttonActive}
            onClick={nextPage}
            >Next</StyledNextButton>
        </div>
    </div>
  )
}

 