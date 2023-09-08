package com.twitter.dto;

public class FindUsernameDTO {

    private String email;
    private String username;
    private String phone;

    public FindUsernameDTO() {
        super();
    }

    public FindUsernameDTO(String email, String username, String phone) {
        this.email = email;
        this.username = username;
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "FindUsernameDTO{" +
                "email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
