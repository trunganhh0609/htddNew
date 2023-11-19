package com.project.qlrl.services;

import com.project.qlrl.repository.HistoryOfAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class HistoryOfAttendanceService {

    @Autowired
    HistoryOfAttendanceRepository historyOfAttendanceRepository;

    public Map<Object,Object> addHistory(Map param){
        Map<Object,Object> result = new HashMap<>();
        try {
            result.put("success", historyOfAttendanceRepository.addHistory(param));
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }

    public Map<Object,Object> countLessonAttendance(Map param){
        Map<Object,Object> result = new HashMap<>();
        try {
            result.put("data", historyOfAttendanceRepository.countLessonAttendance(param));
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }

}
