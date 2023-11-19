package com.project.qlrl.controllers;

import com.project.qlrl.services.HistoryOfAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HistoryOfAttendanceController {
    @Autowired
    HistoryOfAttendanceService historyOfAttendanceService;

    @PostMapping("/addHistory")
    public Map<Object,Object>  addHistory(@RequestBody Map param){
        return historyOfAttendanceService.addHistory(param);
    }

    @GetMapping("/countLessonAttendance")
    public Map<Object,Object> countLessonAttendance(@RequestParam Map param){
        return historyOfAttendanceService.countLessonAttendance(param);
    }
}
