package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "event_master")
public class EventMaster {
    @Id
    private Integer id;

    @Column(nullable = false)
    private String event;

    public EventMaster() {}

    public EventMaster(Integer id, String event) {
        this.id = id;
        this.event = event;
    }

    public Integer getId() { return id; }
    public String getEvent() { return event; }

    public void setId(Integer id) { this.id = id; }
    public void setEvent(String event) { this.event = event; }
}
