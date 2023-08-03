import React,{useEffect,useState} from 'react'
import { Checkbox } from '../../../../components/Checkbox/Checkbox'
import { DropDown } from '../../../../components/DropDown/DropDown'
import { ValidatedTextInput } from '../../../../components/ValidateInput/ValidatedTextInput'
import { countryCodeDropDown } from '../../utils/RegisterModalUtils'
import { validatePhone } from '../../../../services/validator'
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton'
import { useDispatch,useSelector } from 'react-redux'
import { AppDispatch,RootState } from '../../../../redux/Store'
import { updateUserPhone,updateRegister } from '../../../../redux/Slices/RegisterSlice'
import './RegisterFormFour.css'

export const RegisterFormFour:React.FC=()=>{

    const state=useSelector((state:RootState)=>state.register);
    const dispatch:AppDispatch=useDispatch();



    const [phoneCode,setPhoneCode]=useState<string>("+1");
    const[phoneNumber,setPhoneNumber]=useState<string>("");
    const [valid,setValid]=useState<boolean>(true);

    const changeCode=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setPhoneCode(e.target.value.split(" ")[0]);
    }
    const changePhoneNumber=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPhoneNumber(e.target.value);
        dispatch(
            updateRegister({name:"phoneNumber",
                            value:e.target.value})
        )
        
    }
    const sendPhoneNumber=()=>{
        dispatch(updateUserPhone({
            username:state.username,
            phone:phoneNumber
        }))
    }
   

    useEffect(()=>{
        if(phoneNumber){
            setValid(validatePhone(phoneNumber));
        }
    },[phoneCode,phoneNumber])

    return (
        <div className="reg-step-four-container">
            <div className="reg-step-four-content">
                <h1>Add phone number</h1>
                <p className="reg-step-four-subhead">Enter the phone number you would like to associate with your Twitter acount. You won't get a verefication code sent here.</p>
                <div className="reg-step-four-inputs">
                    <DropDown
                    content={countryCodeDropDown}
                    change={changeCode}
                    label={"Country Code"}
                    defaultValue={"Argentina +54"}
                    />
                    <ValidatedTextInput
                    valid={valid}
                    name={"phoneNumber"}
                    label={"Your phone number"}
                    changeValue={changePhoneNumber}/>
                    {valid ? <></> : <p className="reg-step-four-invalid">Please enter a valid 10 numbers digit</p>}
                </div>
                <div className="reg-step-four-check-group">
                    <p>Let people who have your find and connect with you on Twitter. <span className='reg-step-four-link'>Learn more</span>.</p>
                    <Checkbox/>
                    </div>
                    <div className="reg-step-four-check-group">
                        <p>Let Twitter use your phone number to personalize our servicses, including ads (if permitted by your Ads preferences). If you don't enable this, Twitter will still use your phone nomber for purposes including account security, spam, fraud, and abuse prevention. 
                            <span className="reg-step-four-link">See our Privacy Policy for more information.</span></p>
                            <Checkbox/>
                    </div>
                    <StyledNextButton 
                        disabled={(phoneNumber && valid)?false:true}
                        color={'black'}
                        active={(phoneNumber && valid)?true:false}
                        onClick={sendPhoneNumber}>Update number</StyledNextButton>

                
            </div>
        </div>
    )
}