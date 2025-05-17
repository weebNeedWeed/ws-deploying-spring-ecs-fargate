package com.giaule.momentum.repositories;

import com.giaule.momentum.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface UserRepository extends CrudRepository<User, Long> {
    User findFirstByUsername(String username);
}
