import { Dob } from "../utils/GlobalInterfaces";

export const validateName=(value:string):boolean=>{
return value !== '';
}

export const validateDob = (dob:Dob):boolean=>{
    
    let {month,day,year}=dob;

    let leapYears:number[]=[];

    for(let i=2022;i>1902;i-=4){
        leapYears.push(i);
    }

    if(!month||!day||!year){
        return false;
    }else if(month===2 && day>29){
        return false;
    }else if(month===2 && day===29 && !leapYears.includes(year)){
        return false;
    }else if((month===4 || month===6 || month===9 || month===11) && day>30){
        return false;
    }

    return checkAge(dob);
}

const checkAge=(dob:Dob):boolean=>{
    let {month,day,year}=dob;
    

    let today=new Date();
    let todaysYear=today.getFullYear();
    let todaysMonth=today.getMonth();
    let todaysDay=today.getDate();

    if(todaysYear-year>13){
        return true;
    }else if(todaysYear-year===13){
        if(todaysMonth>month){
            return true;
        }else if(todaysMonth===month){
            if(todaysDay>=day){
                return true;
            }else{
                return false;
            }
        }

    }

    return false;


}

export const validEmail=(value:string):boolean =>{
    if(!value.toLocaleLowerCase().match(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )){
        return false;
    }else{
        return true;
    }
}

export const validatePhone=(phone:string):boolean=>{
    let stripped =phone.replace(/[^0-9]/ig,"");
    return stripped.length===10;
}