package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.PlanMaster;
import com.example.demo.repository.PlanMasterRepository;

@Service
public class PlanMasterService {
    private final PlanMasterRepository planMasterRepository;

    //コンストラクタ
    public PlanMasterService(PlanMasterRepository planMasterRepository) {
        this.planMasterRepository = planMasterRepository;
    }

    public List<PlanMaster> findAll() {
        return planMasterRepository.findAll();
    }
}