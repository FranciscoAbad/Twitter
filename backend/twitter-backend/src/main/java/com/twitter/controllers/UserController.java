package com.twitter.controllers;

import com.google.common.net.HttpHeaders;
import com.twitter.exceptions.UnabledToSavePhotoException;
import com.twitter.models.ApplicationUser;
import com.twitter.services.ImageService;
import com.twitter.services.TokenService;
import com.twitter.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;

    private final ImageService imageService;

    @Autowired
    public UserController(UserService userService, TokenService tokenService,ImageService imageService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.imageService = imageService;
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

    @PostMapping("/pfp")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("image") MultipartFile file) throws UnabledToSavePhotoException {

        String uploadImage= imageService.uploadImage(file,"pfp");

            return ResponseEntity.status(HttpStatus.OK).body(uploadImage);

    }


}

