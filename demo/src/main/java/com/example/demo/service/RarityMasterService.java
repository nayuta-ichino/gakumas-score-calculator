package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.RarityMaster;
import com.example.demo.repository.RarityMasterRepository;

@Service
public class RarityMasterService {
    private final RarityMasterRepository rarityMasterRepository;

    //コンストラクタ
    public RarityMasterService(RarityMasterRepository rarityMasterRepository) {
        this.rarityMasterRepository = rarityMasterRepository;
    }   

    public List<RarityMaster> findAll() {
        return rarityMasterRepository.findAll();
    }
}