import React from 'react'

import { useDispatch } from 'react-redux';
import { incrementStep } from '../../../../redux/Slices/RegisterSlice';
import { AppDispatch } from '../../../../redux/Store';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';
import './RegisterFormTwo.css'
import { Checkbox } from '../../../../components/Checkbox/Checkbox';

export const RegisterFormTwo:React.FC = () => {
const dispatch:AppDispatch=useDispatch();

const nextStep=()=>{
    dispatch(incrementStep());
}

  return (
    <div className='reg-step-two'>
       <div className="reg-step-two-content">
            <h1 className='reg-step-two-header'>
                Customize your experience
            </h1>
            <h3 className='reg-step-two-sub-head'>
                Track where you see Twitter content across the web.
            </h3>
            <div className='reg-step-two-toggle-group'>
                <p className='reg-step-two-privacy'>
                    Twitter use this data to personalize yout experience. This web browsing history will never be stored whit you name,email or phone number.
                </p>
               <Checkbox/>
                
            </div>
            <p className='reg-step-two-policy'>
                    By signing up, you agree to our <span className='reg-step-two-link'></span>,<span className='reg-step-two-link'>Privacy Policy</span>
                    and <span className='reg-step-two-link'>Cookie use</span>. Twitter may use your contact information, including your email adress and phone number for the purpouse outline in our Privacy Polcy.<> </>
                    <span className='reg-step-two-link'>Learn more</span>.
                </p>
            <StyledNextButton active={true} color={"black"} onClick={nextStep}>Next</StyledNextButton>
       </div>
    </div>
  )
}


