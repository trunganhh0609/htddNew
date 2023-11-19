package com.project.qlrl.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface PointRepository {
    int addPoint(Map<Object,Object> param);

    List<Map<Object,Object>> getPoint(Map<Object,Object> param);
}
