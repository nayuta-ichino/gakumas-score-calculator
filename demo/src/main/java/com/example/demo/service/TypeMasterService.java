package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.TypeMaster;
import com.example.demo.repository.TypeMasterRepository;

@Service
public class TypeMasterService {
    private final TypeMasterRepository typeMasterRepository;

    //コンストラクタ
    public TypeMasterService(TypeMasterRepository typeMasterRepository) {
        this.typeMasterRepository = typeMasterRepository;
    }

    public List<TypeMaster> findAll() {
        return typeMasterRepository.findAll();
    }
}
