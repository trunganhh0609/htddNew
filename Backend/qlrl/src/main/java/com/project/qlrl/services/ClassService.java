package com.project.qlrl.services;

import com.project.qlrl.common.CommonConst;
import com.project.qlrl.repository.AttendanceRepository;
import com.project.qlrl.repository.ClassRepository;
import com.project.qlrl.repository.HistoryOfAttendanceRepository;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClassService {

    @Autowired CommonService commonService;

    @Autowired
    ClassRepository classRepository;

    @Autowired
    UserService userService;

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    HistoryOfAttendanceRepository historyOfAttendanceRepository;

    public List<Map<Object,Object>> getClassByTeacher() throws Exception {
        String userUid = commonService.getUserUid();
        Map<Object,Object> param = new HashMap<>();
        param.put("uid", userUid);
        param.put("teacherRole", CommonConst.USER_ROLE_TEACHER);
        return classRepository.getClassByTeacher(param);
    }

    public List<Map<Object,Object>> getCheckInData(String classId, String lesson) throws Exception {
        Map<Object,Object> param = new HashMap<>();
        param.put("classId", classId);
        param.put("studentRole", CommonConst.USER_ROLE_STUDENT);
        param.put("lesson", lesson);
        List<Map<Object,Object>> lstStudent = classRepository.getStudentInClass(param);
        List<Map<Object,Object>> lstAttendanceInLesson = attendanceRepository.getListAttendanceInLesson(param);
        int totalAttendanceInHis = historyOfAttendanceRepository.countLessonAttendance(param);

        for (int i = 0; i < lstStudent.size(); i++) {
            for (int j = 0; j < lstAttendanceInLesson.size(); j++) {
                if(lstStudent.get(i).get("userId").equals(lstAttendanceInLesson.get(j).get("userId"))){

                    param.put("userId", lstStudent.get(i).get("userId"));

                    lstStudent.get(i).put("status", lstAttendanceInLesson.get(j).get("status"));
                    lstStudent.get(i).put("statusName", lstAttendanceInLesson.get(j).get("commName"));
                    lstStudent.get(i).put("numAttendanceInClass", attendanceRepository.countNumAttendanceOfStudent(param));
                    lstStudent.get(i).put("totalAttendance", totalAttendanceInHis);
                    lstStudent.get(i).put("numAttendanceLate", attendanceRepository.countNumAttendanceLate(param));
                }
            }
        }
        return lstStudent;
    }

    public Map<Object, Object> getListClass(){
        Map<Object,Object> result = new HashMap<>();
        try{
            result.put("responseData", classRepository.getListClass());
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
        }
        return result;
    }

    public Map<Object,Object> searchTeacher(String keySearch){
        Map<Object,Object> result = new HashMap<>();
        try {
            result.put("data", classRepository.searchTeacher(keySearch));
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }

    @Transactional
    public Map<Object,Object> addClass(Map<Object,Object> param){
        Map<Object,Object> result = new HashMap<>();
        try {
            classRepository.addClass(param);
            classRepository.addTeacherInClass(param);
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }

    @Transactional
    public Map<Object,Object> updateClass(Map<Object,Object> param){
        Map<Object,Object> result = new HashMap<>();
        try {
            classRepository.updateClass(param);
            if(param.get("newTeacherId") != null){
                classRepository.updateTeacherInClass(param);
            }
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }

    @Transactional
    public Map<Object,Object> deleteClass(Map<Object,Object> param){
        Map<Object,Object> result = new HashMap<>();
        try {
            classRepository.deleteClass(param);
            classRepository.deleteUserInClass(param);
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }

    public Map<Object,Object> getStudentInClass(Map<Object,Object> param){
        Map<Object,Object> result = new HashMap<>();
        try {
           result.put("data", classRepository.getStudentInClass(param));
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }

    public Map<Object,Object> getStudentOption(List<Map> lstStudent){
        Map<Object,Object> result = new HashMap<>();
        Map<Object,Object> param = new HashMap<>();
        param.put("role", CommonConst.USER_ROLE_STUDENT);
        List<String> lstStudentId = new ArrayList<>();
        for (Map student : lstStudent){
            lstStudentId.add(student.get("userName").toString());
        }
        param.put("lstStudentId", lstStudentId);
        try {
            List<Map<Object, Object>> data = classRepository.getStudentOption(param);
            if (data.size()>0){
                for (int i = 0; i < data.size(); i++) {
                    data.get(i).put("label", data.get(i).get("userName") + " - " + data.get(i).get("fullName"));
                }
            }
            result.put("data", data);
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }

    @Transactional
    public Map<Object,Object> addStudentToClass(Map<Object,Object> param){
        Map<Object,Object> result = new HashMap<>();
        List<Integer> lstSelectedStudents = (List<Integer>) param.get("lstStudents");
        try {
            for (Integer studentId : lstSelectedStudents){
                Map<Object, Object> request = new HashMap<>();
                request.put("classId", param.get("classId"));
                request.put("userId", studentId);
                classRepository.addStudentToClass(request);
            }
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }
    public Map<Object,Object> deleteStudentInClass(Map<Object,Object> param){
        Map<Object,Object> result = new HashMap<>();
        try {
            classRepository.deleteStudentInClass(param);
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }

    @Transactional
    public int importExcel(MultipartFile excelFile, String classId) throws Exception {
        int number = 0;
        Map data = new HashMap<>();
        data.put("fileName", excelFile.getOriginalFilename());
        data.put("fileData", excelFile.getBytes());
        try (Workbook workbook = new XSSFWorkbook(excelFile.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0); // Lấy sheet đầu tiên
            int index = 0;
            List<Map<Object, Object>> lstStudent = new ArrayList<>();
            DataFormatter formatter = new DataFormatter();

            for (Row row : sheet) {
                index++;
                if(index > 1){
                    Map<Object,Object> studentInfo = new HashMap<>();
                    String val = formatter.formatCellValue(row.getCell(1));
                    studentInfo.put("studentId", val);
                    studentInfo.put("classId", classId);
                    int ex = classRepository.checkStudentExisting(studentInfo);
                    if(ex > 0){
                        System.out.println("Existing");
                    }else {
                        String userId = userService.getUserIdByUserName(studentInfo.get("studentId").toString());
                        if(userId != ""){
                            studentInfo.put("userId", userId);
                            classRepository.addStudentToClass(studentInfo);
                            number ++;
                        }
                    }
                }
            }
        }
        return number;
    }
}
