package com.giaule.momentum.restcontrollers;

import com.giaule.momentum.repositories.TodoRepository;
import com.giaule.momentum.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api")
@CrossOrigin
public class DashboardRestController {
    private final UserRepository userRepository;
    private final TodoRepository todoRepository;

    @Autowired
    public DashboardRestController(UserRepository userRepository, TodoRepository todoRepository) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
    }

    @GetMapping("/users/count")
    @ResponseStatus(HttpStatus.OK)
    public long countUsers() {
        return userRepository.count();
    }

    @GetMapping("/todos/count")
    @ResponseStatus(HttpStatus.OK)
    public long countTodos() {
        return todoRepository.count();
    }
}
