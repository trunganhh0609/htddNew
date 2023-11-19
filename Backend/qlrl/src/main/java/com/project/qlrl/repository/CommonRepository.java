package com.project.qlrl.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommonRepository {

    List<Map<Object,Object>> getMenuByRole(Map param);
}
