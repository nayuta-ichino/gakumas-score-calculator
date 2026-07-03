package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.EventGetMaster;
import com.example.demo.service.EventGetMasterService;

@RestController
public class EventGetMasterController {
    private final EventGetMasterService eventGetMasterService;

    //コンストラクタ
    public EventGetMasterController(EventGetMasterService eventGetMasterService) {
        this.eventGetMasterService = eventGetMasterService;
    }

    @GetMapping("/api/event-get-master")
    public List<EventGetMaster> getEventGetMasters() {
        return eventGetMasterService.findAll();
    }
}
