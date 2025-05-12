package com.giaule.momentum;

import com.giaule.momentum.entities.User;
import com.giaule.momentum.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository) {
        return username -> {
            User user = userRepository.findFirstByUsername(username);
            if(user == null) {
                throw new UsernameNotFoundException("User with given username was not found: " + username);
            }

            return user;
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(r ->
                        r.requestMatchers("/css/**", "/js/**", "/images/**", "/register").permitAll()
                                .anyRequest().authenticated())
                .formLogin(f ->
                        f.loginPage("/login")
                                .defaultSuccessUrl("/")
                                .failureUrl("/login?error")
                                .permitAll())
                .logout(l ->
                        l.logoutUrl("/logout")
                                .logoutSuccessUrl("/login")
                                .permitAll())
                .build();
    }
}
