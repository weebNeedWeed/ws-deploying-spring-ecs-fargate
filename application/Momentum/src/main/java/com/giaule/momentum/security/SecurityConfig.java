package com.giaule.momentum.security;

import com.giaule.momentum.entities.User;
import com.giaule.momentum.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
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
    @Order(1)
    public SecurityFilterChain securityFilterChainApi(HttpSecurity http, JwtAuthFilter jwtAuthFilter, AuthEntryPointJwt authEntryPointJwt) throws Exception {
        return http
                .securityMatcher("/api/**")
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(e -> e.authenticationEntryPoint(authEntryPointJwt))
                .authorizeHttpRequests(a -> a.anyRequest().permitAll())
                .csrf(c -> c.disable())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain securityFilterChainUI(HttpSecurity http) throws Exception {
        return http
                .securityMatcher("/**")
                .csrf(Customizer.withDefaults())
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
