package com.twitter.controllers;

import com.google.common.net.HttpHeaders;
import com.twitter.models.ApplicationUser;
import com.twitter.services.TokenService;
import com.twitter.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;

    @Autowired
    public UserController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @GetMapping("/verify")
    public ApplicationUser verifyIdentity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String username="";
        ApplicationUser user;

        if(token.substring(0,6).equals("Bearer")){
            String strippedToken=token.substring(7);
            username=tokenService.getUsernameFromToken(strippedToken);
        }

        try{
            user=userService.getUserByUsername(username);
        }catch (Exception e){
            user=null;
        }
        return user;
    }
}
