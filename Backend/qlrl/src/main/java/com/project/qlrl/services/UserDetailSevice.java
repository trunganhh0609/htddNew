package com.project.qlrl.services;


import com.project.qlrl.models.User;
import com.project.qlrl.models.UserDetailsImpl;
import com.project.qlrl.repository.UserRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserDetailSevice implements UserDetailsService {
    @Autowired
    UserRepos userRepos;
    public User getUserByUserName(Map param){
        String userName = param.get("username").toString();
        return userRepos.getUserByUserName(userName);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepos.getUserByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
        return new UserDetailsImpl(user);

    }
}
