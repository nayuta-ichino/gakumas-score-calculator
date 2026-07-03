package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.EventGetMaster;

@Repository
public interface EventGetMasterRepository extends JpaRepository<EventGetMaster, Integer> {
    
}
