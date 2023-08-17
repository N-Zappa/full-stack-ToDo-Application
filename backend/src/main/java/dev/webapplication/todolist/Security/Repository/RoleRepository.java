package dev.webapplication.todolist.Security.Repository;

import dev.webapplication.todolist.Security.Models.ERole;
import dev.webapplication.todolist.Security.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findByName(ERole name);
}
