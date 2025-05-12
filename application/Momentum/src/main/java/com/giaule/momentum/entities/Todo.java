package com.giaule.momentum.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "todos")
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;

    private String title;
    private String description;

    private TodoStatus status = TodoStatus.TODO;
    private PriorityLevel priorityLevel = PriorityLevel.LOW;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public enum TodoStatus {
        TODO, IN_PROGRESS, DONE
    }

    public enum PriorityLevel {
        HIGH, MEDIUM, LOW
    }

    @Override
    public boolean equals(Object o) {
        if(o == null){
            return false;
        }

        if(getClass() != o.getClass()) {
            return false;
        }

        if(this == o) {
            return true;
        }

        return id != null && id.equals(((Todo) o).id);
    }

    @Override
    public int hashCode() {
        return 2021;
    }
}
