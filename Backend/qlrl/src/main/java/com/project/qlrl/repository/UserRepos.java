package com.project.qlrl.repository;

import com.project.qlrl.models.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper

public interface UserRepos {
    User getUserByUserName(String param);

    List<Map<Object,Object>> searchUser(Map param);

    Map getUserRole(Map param);

    Map getUserInfo(Map param);

    Map getInfoTeacher(Map param);

    Map getNormalInfo(Map param);

    int addUser(User user);

    int addUserToClass(Map param);

    int updateUser(Map param);

    int updateUserClass(Map param);

    int deleteUser(Map param);

    int changePassword(Map param);

    String getPassword(Map param);

    List<Map<Object,Object>> statisticalPoint(Map param);

    Map<Object,Object> getUserInfoByEmail(String email);

    int checkUserNameExist (String userName);

    int checkEmailExist(String email);
}
