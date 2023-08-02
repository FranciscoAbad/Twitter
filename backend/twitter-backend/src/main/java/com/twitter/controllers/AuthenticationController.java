package com.twitter.controllers;


import com.twitter.exceptions.EmailAlreadyTakenException;
import com.twitter.exceptions.EmailFailedToSendException;
import com.twitter.exceptions.IncorrectVerificationCodeException;
import com.twitter.exceptions.UserDoesNotExistException;
import com.twitter.models.ApplicationUser;
import com.twitter.models.RegistrationObject;
import com.twitter.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    private final UserService userService;

    @Autowired
    public AuthenticationController(UserService userService){
        this.userService=userService;
    }

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailTaken(){
    return new ResponseEntity<String>("The email you provided is already in use", HttpStatus.CONFLICT);
    }

    // go to http://localhost:8080/auth/register
    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationObject ro){
    return userService.registerUser(ro);
    }

    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesntExist(){
        return new ResponseEntity<String>("The user you are looking for does not exist",HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/phone")
        public ApplicationUser updatePhoneNumber(@RequestBody LinkedHashMap<String,String> body){
        String username=body.get("username");
        String phone=body.get("phone");

        ApplicationUser user=userService.getUserByUsername(username);

        user.setPhone(phone);

        return userService.updateUser(user);

    }
    @ExceptionHandler({EmailFailedToSendException.class})
    public ResponseEntity<String> handleFailedEmail(){
        return new ResponseEntity<String>("Email failed to send",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/email/code")
    public ResponseEntity<String> createEmailVerificationCode(@RequestBody LinkedHashMap<String,String> body){
       userService.generateEmailVerification(body.get("username"));

       return new ResponseEntity<String>("Verification code generated,email sent",HttpStatus.OK);
    }

    @ExceptionHandler({IncorrectVerificationCodeException.class})
    public ResponseEntity<String> handleIncorrectVerificationCode(){
        return new ResponseEntity<String>("The code you provided did not match the verification code",HttpStatus.CONFLICT);
    }
    @PostMapping("/email/verify")
    public ApplicationUser verifyEmail(@RequestBody LinkedHashMap<String,String> body){
        Long code=Long.parseLong(body.get("code"));
        String username=body.get("username");

        return userService.verifyEmail(username,code);
    }

    @PutMapping("/update/password")
    public ApplicationUser updatePassword(@RequestBody LinkedHashMap<String,String> body){
        String username=body.get("username");
        String password=body.get("password");

        return userService.setPassword(username,password);
    }


}
