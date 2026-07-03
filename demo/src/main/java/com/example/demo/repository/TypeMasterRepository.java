package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TypeMaster;

@Repository
public interface TypeMasterRepository extends JpaRepository<TypeMaster, Integer> {
    
}
