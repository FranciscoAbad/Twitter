import React from 'react'
import { ValidatedDisplay } from '../../../../components/ValidateInput/ValidatedDisplay'
import './RegisterFormThree.css'
import { useSelector,useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/Store'
import { stringifyDate } from '../../../../utils/DateUtils'
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton'
import { registerUser } from '../../../../redux/Slices/RegisterSlice'
export const RegisterFormThree:React.FC = () => {

    const dispatcher:AppDispatch=useDispatch();
    const state=useSelector((state:RootState)=>state.register);

    const submitUser=()=>{
        const user={
            firstName:state.firstName,
            lastName:state.lastName,
            email:state.email,
            dob:`${state.dob.year}-${state.dob.month<10?`0${state.dob.month}`:state.dob.month}-${state.dob.day<10?`0${state.dob.day}`:state.dob.day}`
        }

        console.log("Triying to register",user);

        dispatcher(registerUser(user));
    }

  return (
    <div className='reg-step-three-container'>
        <div className='reg-step-three-content'>
            <h1 className='reg-step-three-header'>Create your account</h1>
            <div className='reg-step-three-value'>
                <ValidatedDisplay label={"Name"} value={state.firstName + state.lastName}/>
                {state.error ?
                <p className='reg-step-three-error'>The email you specified is in use, please use a different one.</p>:
                <></>
                }
            </div>
            <div className='reg-step-three-value'>
                <ValidatedDisplay label={"Email"} value={state.email}/>
            </div>
            <div className='reg-step-three-value'>
                <ValidatedDisplay label={"Birth date"} value={stringifyDate(state.dob)}/>    
            </div>  
            <p className='reg-step-three-policy'>
                By signing up you agree our<span className='reg-step-three-link'> Tems of service</span> and <span className='reg-step-three-link'>Privacy policy</span>, including <span className='reg-step-three-link'>Cookie use</span>. Twitter may use your contact information including your email addres and phone number for purposes outlined in out Privacy Policy, like keeping your account secure and personalizing our services including ads. <span className='reg-step-three-link'>Learn more</span>. Others will by able to find you by email or phone number, when provided unless you chose otherwise  
            </p>   
            <StyledNextButton 
            onClick={submitUser}
            color={"blue"}
            active={true}
            >Sign up</StyledNextButton>
            
        </div>
    </div>
  )
}

