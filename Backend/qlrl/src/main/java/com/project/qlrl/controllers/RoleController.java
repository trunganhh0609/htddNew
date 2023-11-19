package com.project.qlrl.controllers;

import com.project.qlrl.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class RoleController {

    @Autowired
    RoleService roleService;

    @GetMapping("/getAllRole")
    public Map<Object,Object> getAllRole(){
        return roleService.getAllRole();
    }
}
