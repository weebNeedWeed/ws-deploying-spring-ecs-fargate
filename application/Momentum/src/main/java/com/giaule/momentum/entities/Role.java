package com.giaule.momentum.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new HashSet<User>();

    public boolean equals(Object o) {
        if(o == null) {
            return false;
        }

        if(getClass() != o.getClass()) {
            return false;
        }

        if(this != o) {
            return false;
        }

        return id != null && id.equals(((Role) o).getId());
    }

    @Override
    public int hashCode() {
        return 2021;
    }
}
