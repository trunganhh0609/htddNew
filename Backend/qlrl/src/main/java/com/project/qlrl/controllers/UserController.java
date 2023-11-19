package com.project.qlrl.controllers;

import com.project.qlrl.models.User;
import com.project.qlrl.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/searchUser")
    public Map<Object, Object> searchUser(@RequestParam Map param){
        return userService.searchUser(param);
    }

    @GetMapping("/userRole")
    public Map getUserRole(@RequestParam Map param){
        return userService.getUserRole(param);
    }

    @GetMapping("/userInfo")
    public Map getUserInfo(@RequestParam Map param){
        return userService.getUserInfo(param);
    }

    @GetMapping("/getNormalInfo")
    public Map getNormalInfo(@RequestParam Map param){
        return userService.getNormalInfo(param);
    }

    @GetMapping("/getInfoTeacher")
    public Map getInfoTeacher(@RequestParam Map param){
        return userService.getInfoTeacher(param);
    }

    @PostMapping("/addUser")
    public Map<Object,Object> addUser(@RequestBody Map param){
        return userService.addUser(param);
    }

    @PostMapping("/updateUser")
    public Map<Object,Object> updateUser(@RequestBody Map param){
        return userService.updateUser(param);
    }

    @PostMapping("/deleteUser")
    public Map<Object,Object> deleteUser(@RequestBody Map param){
        return userService.deleteUser(param);
    }

    @PostMapping("changePassword")
    public Map<Object,Object> changePassword(@RequestBody Map param){
        return userService.changePassword(param);
    }
}
