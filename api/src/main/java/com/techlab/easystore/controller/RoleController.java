package com.techlab.easystore.controller;

import com.techlab.easystore.model.Role;
import com.techlab.easystore.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<Role> getAllRole() {
        return roleService.findAllRole();
    }

    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable Long id) {
        return this.roleService.findRoleById(id);
    }

    @PostMapping
    public ResponseEntity<Role> createRole(@Valid @RequestBody Role role) {
        Role savedRole = this.roleService.createRole(role);
        return ResponseEntity.created(URI.create("/api/role/" + savedRole.getId())).body(savedRole);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable Long id, @Valid @RequestBody Role role) {
        Role updatedRole = this.roleService.updateRole(id, role);
        return ResponseEntity.ok(updatedRole);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Role> deleteRole(@PathVariable Long id) {
        boolean deleted = roleService.deleteRole(id);
        if (deleted) return ResponseEntity.noContent().build();

        return ResponseEntity.notFound().build();
    }
}
