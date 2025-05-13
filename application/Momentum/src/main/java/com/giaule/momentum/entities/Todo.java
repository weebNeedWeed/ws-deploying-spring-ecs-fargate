package com.giaule.momentum.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "todos")
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime due;

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

    // should be in order low -> high (in db, it will be 0 -> 2)
    public enum PriorityLevel {
        LOW, MEDIUM, HIGH
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
