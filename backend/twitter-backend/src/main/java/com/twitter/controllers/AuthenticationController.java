package com.twitter.controllers;


import com.twitter.dto.FindUsernameDTO;
import com.twitter.dto.PasswordCodeDTO;
import com.twitter.exceptions.*;
import com.twitter.models.ApplicationUser;
import com.twitter.models.LoginResponse;
import com.twitter.models.RegistrationObject;
import com.twitter.services.MailService;
import com.twitter.services.TokenService;
import com.twitter.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    private final MailService emailService;

    @Autowired
    public AuthenticationController(UserService userService,TokenService tokenService, AuthenticationManager authenticationManager,MailService emailService){
        this.userService=userService;
        this.authenticationManager=authenticationManager;
        this.tokenService=tokenService;
        this.emailService=emailService;
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

    @ExceptionHandler({InvalidCredentialsException.class})
    public ResponseEntity<String> handleInvalidCredentials(){
        return new ResponseEntity<String>("Invalid credentials",HttpStatus.FORBIDDEN);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LinkedHashMap<String,String> body) throws InvalidCredentialsException{
        String username=body.get("username");
        String password=body.get("password");

        try{
            Authentication auth=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
            String token=tokenService.generateToken(auth);
            return new LoginResponse(userService.getUserByUsername(username),token);
        }catch(AuthenticationException e){
            throw new InvalidCredentialsException();
        }
    }

    @PostMapping("/find")
    public ResponseEntity<String> verifyUsername(@RequestBody FindUsernameDTO credential){
        HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.TEXT_PLAIN);
        String username=userService.verifyUsername(credential);
        return new ResponseEntity<String>(username,HttpStatus.OK);
    }

    @PostMapping("/identifiers")
    public FindUsernameDTO findIdentifiers(@RequestBody FindUsernameDTO credential){
        ApplicationUser user=userService.getUserEmailAndPhone(credential);
        return new FindUsernameDTO(user.getEmail(),user.getUsername(),user.getPhone());
    }

    @PostMapping("/password/code")
    public ResponseEntity<String> retrievePasswordCode(@RequestBody PasswordCodeDTO body) throws EmailFailedToSendException{
        String email=body.getEmail();
        int code= body.getCode();
        try{
            emailService.sendEmail(email,"Your password reset code",""+code);
        }catch (Exception e){
            throw new EmailFailedToSendException();
        }
        return new ResponseEntity<String>("Code sent successfully",HttpStatus.OK);
    }


}
