package com.project.qlrl.services;

import com.project.qlrl.common.TOTPUtils;
import com.project.qlrl.models.User;
import com.project.qlrl.repository.UserRepos;
import com.project.qlrl.services.common.MailService;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserService {
    @Autowired
    UserRepos userRepos;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    CommonService commonService;

    @Autowired
    MailService mailService;


    public User getUserByUserName(String param){
        return userRepos.getUserByUserName(param);
    }
    public Map<Object,Object> searchUser(Map param){
        Map<Object,Object> result = new HashMap<>();
        try{
            result.put("data", userRepos.searchUser(param));
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
            result.put("error", "error");
        }
        return result;
    }
    public Map getUserRole(Map param){
        return userRepos.getUserRole(param);
    }
    public Map getUserInfo(Map param){
        return userRepos.getUserInfo(param);
    }
    public Map getInfoTeacher(Map param){
        return userRepos.getInfoTeacher(param);
    }

    public Map<Object,Object> getNormalInfo(Map param){
        Map<Object,Object> result = new HashMap<>();
        try {
            result.put("data", userRepos.getNormalInfo(param));
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }

    public Map<Object,Object> addUser(Map param){
        Map<Object,Object> result = new HashMap<>();
        try {

            if(userRepos.checkUserNameExist(param.get("userName").toString()) > 0){
                result.put("userName", true);
                return result;
            }
            if (userRepos.checkEmailExist(param.get("email").toString()) > 0){
                result.put("email", true);
                return result;
            }

            User user = new User();
            user.setUserName(param.get("userName").toString());
            user.setName(param.get("fullName").toString());
            user.setGender(param.get("gender").toString().equals("true")? true: false);
            user.setPassword(passwordEncoder.encode(param.get("password").toString()));
            String pattern = "yyyy-MM-dd";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String dob = simpleDateFormat.format(new Date(param.get("dob").toString()));
            user.setBirthDate(dob);
            user.setRole(param.get("role").toString());
            user.setEmail(param.get("email").toString());
            user.setEmailVerifyKey(TOTPUtils.generateSecretKey());

            result.put("success", userRepos.addUser(user));
            result.put("status", true);
//            if(param.get("classId") == null){
//                result.put("success", userRepos.addUser(user));
//            }else{
//                userRepos.addUser(user);
//                param.put("userId", user.getId());
//                result.put("success", userRepos.addUserToClass(param));
//            }
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }

    public Map<Object,Object> updateUser(Map param){
        Map<Object,Object> result = new HashMap<>();
        param.put("gender", param.get("gender").toString().equals("true")? 1: 0 );
        try{
            if(param.get("password") != null){
                param.put("pwd", passwordEncoder.encode(param.get("password").toString()));
            }
            String pattern = "yyyy-MM-dd";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String dob = simpleDateFormat.format(new Date(param.get("dob").toString()));
            param.put("dob", dob);
            userRepos.updateUser(param);
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
            result.put("status", false);
        }
        return result;
    }

    public Map<Object,Object> deleteUser(Map param){
        Map<Object,Object> result = new HashMap<>();
        try {
            userRepos.deleteUser(param);
            result.put("status", true);

        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
            result.put("status", false);
        }
        return result;
    }

    public Map<Object,Object> changePassword(Map param){
        Map<Object,Object> result = new HashMap<>();
        try{
            String correctPass = userRepos.getPassword(param);
            if(passwordEncoder.matches(param.get("oldPassword").toString(), correctPass)){
                param.put("newPass",passwordEncoder.encode(param.get("newPassword").toString()));
                result.put("success", userRepos.changePassword(param));
            }else {
                result.put("errPass","errPass");
            }
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }

    public Map<Object,Object> statisticalPoint(Map param){
        Map<Object,Object> result = new HashMap<>();
        try {
            param.put("userId", commonService.getUserUid());
            result.put("data", userRepos.statisticalPoint(param));
        }catch (Exception e){
            e.printStackTrace();
            result.put("error", "error");
        }
        return result;
    }

    @Transactional
    public void forgotPassword(String email) throws Exception {
        Map<Object,Object> userInfo = commonService.getUserInfoByEmail(email);
//        String emailVerifyKey = userInfo.get("EMAIL_VERIFY_KEY").toString();
        String newPass = String.valueOf(commonService.generatePassword(6));
        Map param = new HashMap<>();
        param.put("newPass", passwordEncoder.encode(newPass));
        param.put("userName", userInfo.get("USER_NAME").toString());
        userRepos.changePassword(param);
        mailService.sentVerificationCode(email, newPass);
    }

    public boolean verifyOTP(String otp, String email) throws Exception{
        Map<Object,Object> userInfo = commonService.getUserInfoByEmail(email);
        String emailVerifyKey = userInfo.get("EMAIL_VERIFY_KEY").toString();
        return mailService.verifyCode(otp, emailVerifyKey);
    }

    public String getUserIdByUserName(String userName) throws Exception{
        String result = "";
        try {
            Map<Object,Object> data =  userRepos.getUserIdByUserName(userName);
            if(data != null){
                result = data.get("userId").toString();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    @Transactional
    public void importExcelStudent(MultipartFile excelFile)throws Exception{
        Map data = new HashMap<>();
        data.put("fileName", excelFile.getOriginalFilename());
        data.put("fileData", excelFile.getBytes());
        try (Workbook workbook = new XSSFWorkbook(excelFile.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0); // Lấy sheet đầu tiên
            int index = 0;
            DataFormatter formatter = new DataFormatter();
            for (Row row : sheet) {
                if (index < sheet.getLastRowNum()){
                    index++;
                    if(index > 1){
                        User user = new User();
                        String studentId = formatter.formatCellValue(row.getCell(1));
                        if(userRepos.checkUserNameExist(studentId) == 0){
                            user.setUserName(studentId);
                            user.setName(row.getCell(2).toString());
                            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                            String date =  row.getCell(3).toString();
                            Date dateBirth = new SimpleDateFormat("dd/MM/yyyy").parse(date);
                            user.setBirthDate(dateFormat.format(dateBirth));
                            user.setGender(row.getCell(4).toString().equals("Nam")? true:false);
                            user.setEmail(row.getCell(5).toString());
                            user.setPassword(passwordEncoder.encode("123456"));
                            user.setRole("ROLE003");
                            userRepos.addUser(user);
                        }
                    }
                }

            }
        }

    }
}
