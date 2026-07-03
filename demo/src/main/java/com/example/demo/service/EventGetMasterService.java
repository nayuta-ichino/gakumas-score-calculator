package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.EventGetMaster;
import com.example.demo.repository.EventGetMasterRepository;

@Service
public class EventGetMasterService {
    private final EventGetMasterRepository eventGetMasterRepository;

    //コンストラクタ
    public EventGetMasterService(EventGetMasterRepository eventGetMasterRepository) {
        this.eventGetMasterRepository = eventGetMasterRepository;
    }

    public List<EventGetMaster> findAll() {
        return eventGetMasterRepository.findAll();
    }

}