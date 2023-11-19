package com.project.qlrl.models;
public class User {
    long USER_ID;
    String USER_NAME;
    String PASSWORD;
    String ROLE_ID;
    String name;
    String birthDate;
    Boolean gender;
    String email;
    String emailVerifyKey;

    public User(long USER_ID, String USER_NAME, String PASSWORD, String ROLE_ID, String name, String birthDate, Boolean gender, String email, String emailVerifyKey) {
        this.USER_ID = USER_ID;
        this.USER_NAME = USER_NAME;
        this.PASSWORD = PASSWORD;
        this.ROLE_ID = ROLE_ID;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.email = email;
        this.emailVerifyKey = emailVerifyKey;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public User() {
    }

    public User(long id, String userName, String password, String role) {
        this.USER_ID = id;
        this.USER_NAME = userName;
        this.PASSWORD = password;
        this.ROLE_ID = role;
    }

    public long getId() {
        return USER_ID;
    }

    public void setId(long id) {
        this.USER_ID = id;
    }

    public String getUserName() {
        return USER_NAME;
    }

    public void setUserName(String userName) {
        this.USER_NAME = userName;
    }

    public String getPassword() {
        return PASSWORD;
    }

    public void setPassword(String password) {
        this.PASSWORD = password;
    }

    public String getRole() {
        return ROLE_ID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmailVerifyKey() {
        return emailVerifyKey;
    }

    public void setEmailVerifyKey(String emailVerifyKey) {
        this.emailVerifyKey = emailVerifyKey;
    }

    public void setRole(String role) {
        this.ROLE_ID = role;
    }
}
