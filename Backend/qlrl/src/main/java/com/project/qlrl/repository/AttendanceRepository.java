package com.project.qlrl.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper

public interface AttendanceRepository {
    List<Map> getAllAttendance();

    int attendance(Map param);

    int attendanceLate(Map param);
    int checkDeviceId(Map param);

    List<Map<Object, Object>> getListAttendanceInLesson(Map param);

    List<Map<Object, Object>> getAttendanceInAllLesson(Map param);

    int countNumAttendanceOfStudent(Map<Object,Object> param);
    int countNumAttendanceLate(Map<Object,Object> param);

    Map<Object,Object> getSumClassPeriod(Map<Object,Object> param);
}
