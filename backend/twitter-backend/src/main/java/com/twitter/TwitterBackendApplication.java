package com.twitter;

import com.twitter.config.RSAKeyProperties;
import com.twitter.models.ApplicationUser;
import com.twitter.models.Role;
import com.twitter.repositories.RoleRepository;
import com.twitter.repositories.UserRepository;
import com.twitter.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;

@EnableConfigurationProperties(RSAKeyProperties.class)
@SpringBootApplication
public class TwitterBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TwitterBackendApplication.class, args);
	}
	@Bean
	CommandLineRunner run(RoleRepository roleRepo, UserService userService){
 return args ->{
roleRepo.save(new Role(1,"USER"));
/*
ApplicationUser u=new ApplicationUser();
u.setFirstName("Francisco");
u.setLastName("Abad");
userService.registerUser(u);*/
 };
	}
}


