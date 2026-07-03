package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.EventMaster;
import com.example.demo.service.EventMasterService;

@RestController
public class EventMasterController {
    private final EventMasterService eventMasterService;

    //コンストラクタ
    public EventMasterController(EventMasterService eventMasterService) {
        this.eventMasterService = eventMasterService;
    }

    @GetMapping("/api/event-master")
    public List<EventMaster> getEventMasters() {
        return eventMasterService.findAll();
    }
}