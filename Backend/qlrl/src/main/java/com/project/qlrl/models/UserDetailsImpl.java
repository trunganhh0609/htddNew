package com.project.qlrl.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    User user;

    public UserDetailsImpl(User user) {
        super();
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        List<GrantedAuthority> authorities = new ArrayList<>();
//        user.getRoles().forEach(r -> {
            authorities.add(new SimpleGrantedAuthority(user.getRole()));
//        });
        return authorities;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
//        return user.isStatus();
        return true;
    }

}

