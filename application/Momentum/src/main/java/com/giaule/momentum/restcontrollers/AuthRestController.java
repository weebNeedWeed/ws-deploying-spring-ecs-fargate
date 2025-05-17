package com.giaule.momentum.restcontrollers;

import com.giaule.momentum.dtos.RestLoginRequest;
import com.giaule.momentum.entities.User;
import com.giaule.momentum.repositories.UserRepository;
import com.giaule.momentum.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@PreAuthorize("isAnonymous()")
public class AuthRestController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthRestController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<String> login(@RequestBody RestLoginRequest loginRequest) {
        User user = userRepository.findFirstByUsername(
                loginRequest.getUsername()
        );
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }

        return ResponseEntity.ok().body(jwtUtils.generateToken(user));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/test")
    public String test() {
        return "Hello";
    }
}
