package com.project.qlrl.controllers;

import com.project.qlrl.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/")
public class AttendanceController {
    @Autowired
    AttendanceService attendanceService;

    @GetMapping("test")
    public String test(){
        return "Trung anh";
    }
    @GetMapping("all")
    public List<Map> getAll(){
        return attendanceService.getAll();
    }

    @PostMapping("attendance")
    public Map attendance(@RequestBody Map param){
        return attendanceService.attendance(param);
    }

    @PostMapping("addAbsentStudent")
    public Map<Object,Object> addAbsentStudent(@RequestBody Map param){
        return attendanceService.addListAbsent(param);
    }

    @PostMapping("checkDeviceId")
    public Map checkDeviceId(@RequestBody Map param){
        return attendanceService.checkDeviceId(param);
    }

    @GetMapping("getListAttendanceInLesson")
    public Map getListAttendanceInLesson(@RequestParam Map param){
    	System.out.print(param);
        return attendanceService.getListAttendanceInLesson(param);
    }
}
