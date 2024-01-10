package com.project.qlrl.controllers;

import com.project.qlrl.common.CommonConst;
import com.project.qlrl.services.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/class/")
public class ClassController {

    @Autowired
    ClassService classService;

    @GetMapping("getClassByTeacher")
    public Map<Object,Object> getClassByTeacher(){
        Map<Object,Object> result = new HashMap<>();
        try {
            result.put("data", classService.getClassByTeacher());
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
        }
        return result;
    }

    @GetMapping("getCheckInData")
    public Map<Object,Object> getCheckInData(@RequestParam String classId, @RequestParam String lesson){
        Map<Object,Object> result = new HashMap<>();
        try {
            result.put("data", classService.getCheckInData(classId, lesson));
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
        }
        return result;
    }

    @GetMapping("getListClass")
    public Map<Object,Object> getListClass(){
        return classService.getListClass();
    }

    @GetMapping("searchTeacher")
    public Map<Object,Object> searchTeacher(@RequestParam String keySearch){
        return classService.searchTeacher(keySearch);
    }

    @PostMapping("addClass")
    public Map<Object,Object> addClass(@RequestBody Map<Object,Object> param){
        return classService.addClass(param);
    }

    @PostMapping("updateClass")
    public Map<Object,Object> updateClass(@RequestBody Map<Object,Object> param){
        return classService.updateClass(param);
    }
    @PostMapping("deleteClass")
    public Map<Object,Object> deleteClass(@RequestBody Map<Object,Object> param){
        return classService.deleteClass(param);
    }

    @GetMapping("getStudentInClass")
    public Map<Object,Object> getStudentInClass(@RequestParam String classId){
        Map<Object,Object> param = new HashMap<>();
        param.put("classId", classId);
        param.put("studentRole", CommonConst.USER_ROLE_STUDENT);
        return classService.getStudentInClass(param);
    }

    @PostMapping("getStudentOption")
    public Map<Object,Object> getStudentOption(@RequestBody List<Map> lstStudent){
        return classService.getStudentOption(lstStudent);
    }

    @PostMapping("addStudentToClass")
    public Map<Object,Object> addStudentToClass(@RequestBody Map<Object,Object> param){
        return classService.addStudentToClass(param);
    }
    @PostMapping("deleteStudentInClass")
    public Map<Object,Object> deleteStudentInClass(@RequestBody Map<Object,Object> param){
        return classService.deleteStudentInClass(param);
    }

    @PostMapping("/importExcelStudent")
    public Map<Object,Object> importExcel(@RequestParam("file") MultipartFile file, @RequestParam("classId") String classId) throws IOException, ParseException {
        Map<Object,Object> result = new HashMap<>();

        try {
            result.put("num", classService.importExcel(file, classId));
            result.put("status",true);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("status", false);
        }
        return result;
    }


}
