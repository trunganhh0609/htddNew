package com.project.qlrl.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface ClassRepository {

    public List<Map<Object,Object>> getClassByTeacher(Map<Object,Object> param);
    public List<Map<Object,Object>> getStudentInClass(Map<Object,Object> param);
    public List<Map<Object,Object>> getListClass();
    public List<Map<Object,Object>> searchTeacher(String keySearch);
    public int addClass(Map<Object,Object> param);
    public int addTeacherInClass(Map<Object,Object> param);

    public int updateTeacherInClass(Map<Object,Object> param);
    public int updateClass(Map<Object,Object> param);

    public int deleteUserInClass(Map<Object,Object> param);
    public int deleteClass(Map<Object,Object> param);
    public List<Map<Object,Object>> getStudentOption(Map<Object,Object>param);
    public int addStudentToClass(Map<Object,Object> param);
    public int deleteStudentInClass(Map<Object,Object> param);

    public int checkStudentExisting(Map<Object,Object> param);

}
