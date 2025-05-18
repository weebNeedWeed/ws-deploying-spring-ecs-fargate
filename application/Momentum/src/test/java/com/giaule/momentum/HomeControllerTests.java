package com.giaule.momentum;

import com.giaule.momentum.controllers.HomeController;
import com.giaule.momentum.entities.Todo;
import com.giaule.momentum.entities.User;
import com.giaule.momentum.repositories.TodoRepository;
import com.giaule.momentum.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Sort;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HomeController.class)
class HomeControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TodoRepository todoRepository;

    @Test
    @WithMockUser
    public void testIndex() throws Exception {
        // Prepare test data
        List<Todo> todos = new ArrayList<>();
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setTitle("Test Todo");
        todo.setDescription("Test Description");
        todo.setStatus(Todo.TodoStatus.TODO);
        todo.setPriorityLevel(Todo.PriorityLevel.MEDIUM);
        todos.add(todo);
        
        // Mock repository response
        when(todoRepository.findByStatusAndPriorityLevel(any(), any(), any(Sort.class)))
            .thenReturn(todos);
        
        // Perform the request and verify response
        mockMvc.perform(get("/"))
            .andExpect(status().isOk())
            .andExpect(view().name("home"))
            .andExpect(model().attributeExists("todos"))
            .andExpect(content().string(containsString("Test Todo")));
    }
    
    @Test
    @WithMockUser
    public void testAddTodoForm() throws Exception {
        mockMvc.perform(get("/add"))
            .andExpect(status().isOk())
            .andExpect(view().name("add"))
            .andExpect(model().attributeExists("request"));
    }
    
    @Test
    @WithMockUser
    public void testAddTodo() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        
        mockMvc.perform(post("/add")
            .param("title", "New Todo")
            .param("description", "New Description")
            .param("priorityLevel", "HIGH")
            .with(SecurityMockMvcRequestPostProcessors.user(user)))
            .andExpect(status().is3xxRedirection())
            .andExpect(redirectedUrl("/"));
    }
    
    @Test
    @WithMockUser
    public void testChangeStatus() throws Exception {
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setStatus(Todo.TodoStatus.TODO);
        
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));
        
        mockMvc.perform(post("/1/change-status")
            .param("status", "DONE"))
            .andExpect(status().is3xxRedirection())
            .andExpect(redirectedUrl("/"));
    }
    
    @Test
    @WithMockUser
    public void testEditTodoForm() throws Exception {
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setTitle("Test Todo");
        todo.setDescription("Test Description");
        
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));
        
        mockMvc.perform(get("/1/edit"))
            .andExpect(status().isOk())
            .andExpect(view().name("edit"))
            .andExpect(model().attributeExists("todo"));
    }
    
    @Test
    @WithMockUser
    public void testDeleteTodo() throws Exception {
        Todo todo = new Todo();
        todo.setId(1L);
        
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));
        
        mockMvc.perform(post("/1/delete"))
            .andExpect(status().is3xxRedirection())
            .andExpect(redirectedUrl("/"));
    }
}
