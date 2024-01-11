package com.project.qlrl.services;

import com.project.qlrl.repository.AttendanceRepository;
import com.project.qlrl.repository.HistoryOfAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceService {
    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    HistoryOfAttendanceRepository historyOfAttendanceRepository;

    public List<Map> getAll(){
        return attendanceRepository.getAllAttendance();
    }

    public Map attendance(Map param){
        Map result = new HashMap<>();
        try {
            if(param.get("status").toString().equals("01-03")){
                attendanceRepository.attendanceLate(param);
            }else{
                attendanceRepository.attendance(param);
            }
            result.put("response","success");
        }catch (Exception e){
            e.printStackTrace();
            result.put("response"," attendance error");
        }
        return result;
    }
    @Transactional
    public Map<Object,Object> addListAbsent(Map<Object,Object> param){
        Map<Object,Object> result = new HashMap<>();

        List<Map<Object,Object>> lstAbsent = (List<Map<Object, Object>>) param.get("lstAbsent");
        List<Map<Object,Object>> listAttendance = attendanceRepository.getListAttendanceInLesson(param);
        try {
            for (int i = 0; i < lstAbsent.size() ; i++) {
                boolean isAdd = true;
                for (int j = 0; j < listAttendance.size(); j++) {
                    if(listAttendance.get(j).get("userId").toString().equals(lstAbsent.get(i).get("userId").toString())){
                        isAdd = false;
                    }
                }
                if(isAdd == true){
                    lstAbsent.get(i).put("userId", lstAbsent.get(i).get("userId").toString());
                    lstAbsent.get(i).put("lesson", param.get("lesson").toString());
                    lstAbsent.get(i).put("classId", param.get("classId").toString());
                    lstAbsent.get(i).put("status", "01-04");
                    lstAbsent.get(i).put("numClassPeriod", 0);
                    attendanceRepository.attendance(lstAbsent.get(i));
                }

            }
            result.put("success", "success");
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "add absent error");
        }
        return result;
    }
    public Map checkDeviceId(Map param){
        Map result = new HashMap<>();
        try {
            result.put("response", attendanceRepository.checkDeviceId(param));
        }catch (Exception e){
            e.printStackTrace();
            result.put("response", "error");
        }
        return result;
    }

    public Map<Object, Object> getListAttendanceInLesson(Map param) {
        Map result = new HashMap<>();
        try {
            result.put("listAttendanceInLesson", attendanceRepository.getListAttendanceInLesson(param));
            result.put("attendanceInAllLesson", attendanceRepository.getAttendanceInAllLesson(param));
            result.put("totalLessonAttendance", historyOfAttendanceRepository.countLessonAttendance(param));
        } catch (Exception e) {
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }

    public Map<Object,Object> getAttendanceInAllLesson(Map param){
        Map<Object,Object> result = new HashMap<>();
        try {
            result.put("data", attendanceRepository.getAttendanceInAllLesson(param));
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }

    public Map<Object,Object> checkStudentInClass(Map<Object,Object> param){
        Map<Object,Object> result = new HashMap<>();
        try {
            int rs = attendanceRepository.checkStudentInClass(param);
            result.put("existing", rs>0? true:false);
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }
}
