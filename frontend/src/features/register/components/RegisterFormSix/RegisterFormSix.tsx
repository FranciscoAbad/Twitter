import React,{useState} from 'react'
import { ValidatedTextInput } from '../../../../components/ValidateInput/ValidatedTextInput'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from  '@mui/icons-material/VisibilityOffOutlined'
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton'
import './RegisterFormSix.css'
import { AppDispatch,RootState } from '../../../../redux/Store'
import { useSelector,useDispatch } from 'react-redux'
import { updatePassword } from '../../../../redux/Slices/RegisterSlice'
import {useNavigate} from 'react-router-dom';


export const RegisterFormSix:React.FC =()=>{

    const state=useSelector((state:RootState)=>state.register);
    const dispatch:AppDispatch=useDispatch();

    const navigate= useNavigate();

    const [active,setActive]=useState<boolean>(false);
    const[password,setPassword]=useState<string>("");



    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
    }

    const toggleView=()=>{
        setActive(!active);
    }

    const sendPassword=async()=>{
        await dispatch(updatePassword({
            username:state.username,
            password
        }))

        navigate("/home");
    }
    return (
        <div className="reg-step-six-container">
            <div className="reg-step-six-content">
                <h1>You'll need a password</h1>
                <p>Make sure it's 8 characters or more</p>
                <div className="reg-step-six-password">
                    <ValidatedTextInput 
                        valid={true}
                        label={"Password"}
                        name={"password"}
                        changeValue={handleChange}
                        attributes={{
                            minLength:8,
                            type:active?"text":"password"
                        }}/>
                    <div onClick={toggleView} className="reg-step-six-icon">
                        {active?
                        <VisibilityOutlinedIcon sx={{
                            fontSize:"24px"
                        }}/>:
                        <VisibilityOutlinedIcon sx={{
                            fontSize:"24px"
                        }}/>}
                    </div>
                </div>
                <StyledNextButton 
                active={password.length>=8}
                disabled={!(password.length>=8)}
                onClick={sendPassword}
                color={'black'}>
                    Next
                </StyledNextButton>
            </div>
          
        </div>
    )
}