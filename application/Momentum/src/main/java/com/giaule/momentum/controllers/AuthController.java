package com.giaule.momentum.controllers;

import com.giaule.momentum.dtos.RegisterRequest;
import com.giaule.momentum.entities.User;
import com.giaule.momentum.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthController {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public AuthController(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("request", new RegisterRequest());
        return "register";
    }

    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("request") RegisterRequest request, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return "register";
        }

        if(!request.getPassword().equals(request.getPasswordConfirmation())) {
            bindingResult.rejectValue(
                    "passwordConfirmation",
                    "errors.passwordConfirmation",
                    "Your password did not match");
            return "register";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "redirect:/login";
    }
}
