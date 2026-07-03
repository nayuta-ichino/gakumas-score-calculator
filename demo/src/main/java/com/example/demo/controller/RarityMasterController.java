package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.RarityMaster;
import com.example.demo.service.RarityMasterService;

@RestController
public class RarityMasterController {
    private final RarityMasterService rarityMasterService;

    //コンストラクタ
    public RarityMasterController(RarityMasterService rarityMasterService) {
        this.rarityMasterService = rarityMasterService;
    }

    @GetMapping("/api/rarity-master")
    public List<RarityMaster> getRarityMasters() {
        return rarityMasterService.findAll();
    }
}
