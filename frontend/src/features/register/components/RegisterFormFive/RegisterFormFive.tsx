import React, {useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { RootState,AppDispatch } from '../../../../redux/Store'
import { ValidatedTextInput } from '../../../../components/ValidateInput/ValidatedTextInput'
import './RegisterFormFive.css'
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton'
import { resendEmail } from '../../../../redux/Slices/RegisterSlice'

export const RegisterFormFive:React.FC=()=>{

    const state=useSelector((state:RootState)=>state.register);
    const [code,setCode]=useState<string>("");
    const dispatch:AppDispatch=useDispatch();

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setCode(e.target.value);
    }

    const resend=()=>{
        dispatch(resendEmail(state.username))
    }

    return(
        <div className="reg-step-five-container">
            <div className="reg-step-five-content">
                <h1>We sent you a code</h1>
                <p>Enter it below to verify {state.email}</p>
                <ValidatedTextInput 
                    valid={true} 
                    name={"code"} 
                    label={"Verification code"} 
                    changeValue={handleChange}
                 />
                 <p className="reg-step-five-message">Didn't recive a email?</p>   
                 <StyledNextButton active={code?true:false} disabled={code?false:true} color={'black'} onClick={resend}></StyledNextButton>
            </div>
        </div>
    )
}