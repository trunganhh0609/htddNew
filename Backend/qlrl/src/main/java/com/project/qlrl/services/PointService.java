package com.project.qlrl.services;

import com.project.qlrl.common.CommonConst;
import com.project.qlrl.repository.AttendanceRepository;
import com.project.qlrl.repository.ClassRepository;
import com.project.qlrl.repository.HistoryOfAttendanceRepository;
import com.project.qlrl.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PointService {

    @Autowired
    PointRepository pointRepository;

    @Autowired
    ClassRepository classRepository;

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    HistoryOfAttendanceRepository historyOfAttendanceRepository;

    @Transactional
    public Map<Object,Object> addPoint(Map<Object,Object> param){
        Map<Object, Object> result = new HashMap<>();
        List<Map<Object,Object>> lstPoint = (List<Map<Object,Object>>) param.get("lstPoint");
        try {
            for (int i = 0; i < lstPoint.size(); i++) {
                lstPoint.get(i).put("classId", param.get("classId"));
                pointRepository.addPoint(lstPoint.get(i));
            }
            result.put("status", true);
        }catch (Exception e){
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }

    public Map<Object,Object> getPoint(Map<Object,Object> param){
        Map<Object, Object> result = new HashMap<>();
        try {
            result.put("data", pointRepository.getPoint(param));
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }

    public List<Map<Object,Object>> getCheckInDataInClass(String classId) throws Exception {
        Map<Object,Object> param = new HashMap<>();
        param.put("classId", classId);
        param.put("studentRole", CommonConst.USER_ROLE_STUDENT);
        List<Map<Object,Object>> lstStudent = classRepository.getStudentInClass(param);
        List<Map<Object, Object>> lstPoint = pointRepository.getPoint(param);
        int totalAttendanceInHis = historyOfAttendanceRepository.countLessonAttendance(param);

        for (int i = 0; i < lstStudent.size(); i++) {
            param.put("userId", lstStudent.get(i).get("userId"));
            lstStudent.get(i).put("numAttendanceInClass", attendanceRepository.countNumAttendanceOfStudent(param));
            lstStudent.get(i).put("totalAttendance", totalAttendanceInHis);
            lstStudent.get(i).put("numAttendanceLate", attendanceRepository.countNumAttendanceLate(param));

            if(lstPoint.size() > 0){
                for (int j = 0; j < lstPoint.size(); j++) {
                    if(lstStudent.get(i).get("userId").toString().equals(lstPoint.get(j).get("userId").toString())){
                        lstStudent.get(i).put("point", lstPoint.get(j).get("point"));
                    }
                }

            }
        }
        return lstStudent;
    }

}
