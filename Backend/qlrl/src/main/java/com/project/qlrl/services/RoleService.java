package com.project.qlrl.services;

import com.project.qlrl.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    public Map<Object,Object> getAllRole(){
        Map<Object,Object> result = new HashMap<>();
        try {
            result.put("data", roleRepository.getAllRole());
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }
}
