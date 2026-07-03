package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.PlanMaster;
import com.example.demo.service.PlanMasterService;

@RestController
public class PlanMasterController {
    private final PlanMasterService planMasterService;

    //コンストラクタ
    public PlanMasterController(PlanMasterService planMasterService) {
        this.planMasterService = planMasterService;
    }

    @GetMapping("/api/plan-master")
    public List<PlanMaster> getPlanMasters() {
        return planMasterService.findAll();
    }
}
