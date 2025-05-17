package com.giaule.momentum.repositories;

import com.giaule.momentum.entities.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findFirstByName(String roleName);
}
