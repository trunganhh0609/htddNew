package com.project.qlrl.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface HistoryOfAttendanceRepository {
    int addHistory(Map param);

    int countLessonAttendance(Map param);

    Map<Object,Object> getTotalClassPeriodInLess(Map<Object,Object> param);
    Map<Object,Object> getTotalClassPeriodInClass(Map<Object,Object> param);
}
