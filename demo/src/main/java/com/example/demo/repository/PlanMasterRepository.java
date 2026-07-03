package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PlanMaster;

@Repository
public interface PlanMasterRepository extends JpaRepository<PlanMaster, Integer> {
    
}