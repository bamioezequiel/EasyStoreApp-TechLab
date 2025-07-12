package com.techlab.easystore.dto;

public class AuthResponse {
    private Long user_id;
    private String username;
    private String role;
    private String token;

    public AuthResponse(Long user_id, String username, String role, String token) {
        this.user_id = user_id;
        this.username = username;
        this.role = role;
        this.token = token;
    }

    public Long getUser_id() { return user_id; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
    public String getToken() { return token; }
}