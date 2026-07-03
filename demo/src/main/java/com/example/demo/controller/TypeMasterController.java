package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.TypeMaster;
import com.example.demo.service.TypeMasterService;

@RestController
public class TypeMasterController {
    private final TypeMasterService typeMasterService;

    //コンストラクタ
    public TypeMasterController(TypeMasterService typeMasterService) {
        this.typeMasterService = typeMasterService;
    }

    @GetMapping("/api/type-master")
    public List<TypeMaster> getTypeMasters() {
        return typeMasterService.findAll();
    }
}
