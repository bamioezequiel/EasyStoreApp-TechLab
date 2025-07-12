package com.techlab.easystore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del rol no puede estar vacío.")
    @Size(max = 50, message = "El nombre del rol no debe superar los 50 caracteres.")
    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<User> users;

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
