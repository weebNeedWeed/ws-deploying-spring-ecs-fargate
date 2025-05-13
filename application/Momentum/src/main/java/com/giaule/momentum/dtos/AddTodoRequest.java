package com.giaule.momentum.dtos;

import com.giaule.momentum.entities.Todo;
import com.giaule.momentum.entities.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddTodoRequest {
    private LocalDateTime due;
    private String title;
    private String description;
    private Todo.PriorityLevel priorityLevel;

    public Todo toTodo() {
        Todo todo = new Todo();
        todo.setTitle(title);
        todo.setDescription(description);
        todo.setPriorityLevel(priorityLevel);
        todo.setDue(due);
        return todo;
    }
}
