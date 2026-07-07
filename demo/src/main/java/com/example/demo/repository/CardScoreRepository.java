package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CardScoreEntity;

@Repository
public interface CardScoreRepository extends JpaRepository<CardScoreEntity, Integer> {
    
}
