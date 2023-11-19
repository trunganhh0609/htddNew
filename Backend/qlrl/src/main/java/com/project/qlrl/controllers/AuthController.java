package com.project.qlrl.controllers;

import com.project.qlrl.common.JwtUtils;
import com.project.qlrl.models.UserDetailsImpl;
import com.project.qlrl.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    UserService userService;


    @PostMapping("/login")
    public Map authenticateUser(@RequestBody Map loginRequest) {
//        AjaxResult ajaxResult = new AjaxResult();
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.get("userName"), loginRequest.get("password")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();


//				List<String> roles = userDetails.getAuthorities().stream()
//						.map(item -> item.getAuthority())
//						.collect(Collectors.toList());
                result.put("Message", "Login successfully !!!");
                result.put("jwt" ,jwt);
                result.put("Data", userDetails.getUser());
        } catch (Exception e) {
            e.printStackTrace();
            result.put("Message", "Login failed !!!");
        }
        return result;
    }

    @GetMapping("forgot-password")
    public Map<Object, Object> forgotPassword(@RequestParam String email){
        Map<Object, Object> result = new HashMap<>();
        try{
            result.put("status", true);
            userService.forgotPassword(email);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
        }
        return result;
    }

    @PostMapping("verify-otp")
    public Map<Object,Object> verifyOTP(@RequestBody Map<Object,Object> param){
        Map<Object,Object> result = new HashMap<>();
        try{
            String otp = param.get("otp").toString();
            String email = param.get("email").toString();
            result.put("responseData", userService.verifyOTP(otp, email));
            result.put("status", true);
        }catch (Exception e){
            e.printStackTrace();
            result.put("status", false);
        }
        return result;
    }
}
