package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.EventMaster;

@Repository
public interface EventMasterRepository extends JpaRepository<EventMaster, Integer> {
    
}