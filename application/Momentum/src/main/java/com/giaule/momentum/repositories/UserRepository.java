package com.giaule.momentum.repositories;

import com.giaule.momentum.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findFirstByUsername(String username);
}
