package com.project.qlrl.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface RoleRepository {

    List<Map<Object,Object>> getAllRole();

}
