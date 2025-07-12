package com.techlab.easystore.service;

import com.techlab.easystore.model.Role;
import com.techlab.easystore.repository.RoleRepository;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> findAllRole() {
        return this.roleRepository.findAll();
    }

    public Role findRoleById(Long id) {
        return this.roleRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Rol no encontrado con ID: " + id));
    }

    public Role createRole(Role role) {
        return this.roleRepository.save(role);
    }

    public Role updateRole(Long id, Role role) {
        Role updatedRole = findRoleById(id);
        updatedRole.setName(role.getName());

        return this.roleRepository.save(updatedRole);
    }

    public boolean deleteRole(@PathVariable Long id) {
        if (this.roleRepository.existsById(id)) {
            this.roleRepository.deleteById(id);
            return true;
        }

        return false;
    }
}
