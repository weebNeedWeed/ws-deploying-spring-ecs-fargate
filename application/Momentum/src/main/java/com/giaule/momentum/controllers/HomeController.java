package com.giaule.momentum.controllers;

import com.giaule.momentum.dtos.AddTodoRequest;
import com.giaule.momentum.dtos.FilterTodoRequest;
import com.giaule.momentum.entities.Todo;
import com.giaule.momentum.entities.User;
import com.giaule.momentum.repositories.TodoRepository;
import com.giaule.momentum.repositories.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/")
public class HomeController {
    private final UserRepository userRepository;
    private final TodoRepository todoRepository;

    public HomeController(UserRepository userRepository, TodoRepository todoRepository) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
    }

    @GetMapping
    public String index(FilterTodoRequest request, Model model) {
        Iterable<Todo> todos;

        Todo.TodoStatus status = request.getStatus().equals("ALL") ? null : Todo.TodoStatus.valueOf(request.getStatus());
        Todo.PriorityLevel priorityLevel = request.getPriorityLevel().equals("ALL") ? null : Todo.PriorityLevel.valueOf(request.getPriorityLevel());

        String[] sortBys = request.getSortBy().split("-");
        Sort sort = Sort.by(Sort.Direction.valueOf(sortBys[1].toUpperCase()), sortBys[0]);

        todos = todoRepository.findByStatusAndPriorityLevel(status, priorityLevel, sort);

        model.addAttribute("todos", todos);
        return "home";
    }

    @GetMapping("add")
    public String addTodoForm(Model model) {
        model.addAttribute("request", new AddTodoRequest());
        return "add";
    }

    @PostMapping("add")
    public String addTodo(@ModelAttribute("request") AddTodoRequest addTodoRequest, @AuthenticationPrincipal User user) {
        Todo todo = addTodoRequest.toTodo();
        user.addTodo(todo);
        userRepository.save(user);
        return "redirect:/";
    }
}
