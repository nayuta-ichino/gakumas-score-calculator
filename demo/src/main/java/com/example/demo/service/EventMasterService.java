package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.EventMaster;
import com.example.demo.repository.EventMasterRepository;

@Service
public class EventMasterService {
    private final EventMasterRepository eventMasterRepository;

    //コンストラクタ
    public EventMasterService(EventMasterRepository eventMasterRepository) {
        this.eventMasterRepository = eventMasterRepository;
    }

    public List<EventMaster> findAll(){
        return eventMasterRepository.findAll();
    }

}