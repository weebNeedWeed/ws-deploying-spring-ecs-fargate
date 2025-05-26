package com.giaule.momentum.repositories;

import com.giaule.momentum.entities.Todo;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long> {
    @Query("select t from Todo t where (:status is null or t.status = :status) and (:priority is null or t.priorityLevel = :priority) and t.user.id = :userId")
    Iterable<Todo> findByStatusAndPriorityLevel(Todo.TodoStatus status, Todo.PriorityLevel priority, long userId, Sort sort);
}
