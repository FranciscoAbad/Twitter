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
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@EnableConfigurationProperties(RSAKeyProperties.class)
@SpringBootApplication
public class TwitterBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TwitterBackendApplication.class, args);
	}
	@Bean
	CommandLineRunner run(RoleRepository roleRepo, UserRepository userRepo, PasswordEncoder passwordEncoder){
 return args ->{
Role r =roleRepo.save(new Role(1,"USER"));

Set<Role> roles=new HashSet<>();

roles.add(r);


ApplicationUser u=new ApplicationUser();
	 u.setAuthorities(roles);
u.setFirstName("Francisco");
u.setLastName("Abad");
u.setPassword(passwordEncoder.encode("12345678"));
u.setUsername("francisco");
u.setPhone("1111111111");
u.setEmail("telken@gmail.com");
	 u.setEnabled(true);
	 userRepo.save(u);


	 ApplicationUser u2=new ApplicationUser();
	 u2.setAuthorities(roles);
	 u2.setFirstName("Srraancisco");
	 u2.setLastName("Abad");
	 u2.setPassword(passwordEncoder.encode("12345678"));
	 u2.setUsername("santiago");
	 u2.setPhone("1212121212");
	 u2.setEmail("telkennn@gmail.com");
	 u2.setEnabled(true);
	 userRepo.save(u2);






 };
	}
}


