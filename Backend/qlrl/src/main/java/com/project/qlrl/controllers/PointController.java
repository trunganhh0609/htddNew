package com.project.qlrl.controllers;

import com.project.qlrl.services.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PointController {
    @Autowired
    PointService pointService;

    @PostMapping("/addPoint")
    public Map<Object, Object> addPoint(@RequestBody Map<Object,Object> param){
        return pointService.addPoint(param);
    }

    @GetMapping("/getPoint")
    public Map<Object, Object> getPoint(@RequestParam String classId) throws Exception {
        Map<Object, Object> result = new HashMap<>();
        try {
            result.put("data", pointService.getCheckInDataInClass(classId));
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
        }
        return result;
    }
}
