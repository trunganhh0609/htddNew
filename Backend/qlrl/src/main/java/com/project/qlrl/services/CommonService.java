package com.project.qlrl.services;

import com.project.qlrl.repository.CommonRepository;
import com.project.qlrl.repository.UserRepos;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class CommonService {
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Autowired
    CommonRepository commonRepository;

    @Autowired
    UserRepos userRepos;

    public Map<Object,Object> getMenuByRole(Map param){
        Map<Object,Object> result = new HashMap<>();
        try {
            result.put("data", commonRepository.getMenuByRole(param));
        }catch (Exception e){
            e.printStackTrace();
            result.put("error","error");
        }
        return result;
    }

    private String getUserNameFromToken(String token) {
        Claims data = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public String getUserName() throws Exception {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();

        String accessToken = getTokenFromRequest(request);
        String userUid = getUserNameFromToken(accessToken);
        if (StringUtils.isBlank(userUid)) {
            throw new Exception("USER UID is null!");
        }
        return userUid;
    }

    public Map<Object, Object> getUserInfo() throws Exception {
        Map<Object, Object> param = new HashMap<>();
        param.put("userName", getUserName());
        try {
            return userRepos.getUserInfo(param);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public String getUserUid() throws Exception{
        Map<Object, Object> param = new HashMap<>();
        param.put("userName", getUserName());
        try {
            return userRepos.getUserInfo(param).get("USER_ID").toString();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public Map<Object, Object> getUserInfoByEmail(String email) throws Exception {
        try {
            return userRepos.getUserInfoByEmail(email);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
    private String getTokenFromRequest(HttpServletRequest request) {
        Enumeration<String> headers = request.getHeaders("authorization");
        String headerValue = "";
        while (headers.hasMoreElements()) {
            headerValue = headers.nextElement();
        }
        if (headerValue != null && !"".equals(headerValue)) {
            String els[] = headerValue.split(" ");
            if (els.length > 1) {
                return els[1];
            }
        }
        return "";
    }

    public char[] generatePassword(int length) {
        String capitalCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String specialCharacters = "!@#$";
        String numbers = "1234567890";
        String combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;
        Random random = new Random();
        char[] password = new char[length];

        password[0] = lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length()));
        password[1] = capitalCaseLetters.charAt(random.nextInt(capitalCaseLetters.length()));
        password[2] = specialCharacters.charAt(random.nextInt(specialCharacters.length()));
        password[3] = numbers.charAt(random.nextInt(numbers.length()));

        for(int i = 4; i< length ; i++) {
            password[i] = combinedChars.charAt(random.nextInt(combinedChars.length()));
        }
        return password;
    }

}
