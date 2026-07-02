package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "event_get_master")
public class EventGetMaster {
    @Id
    private Integer id;

    @Column(name="event_get", nullable = false)
    private String eventGet;
    
    public EventGetMaster() {}

    public EventGetMaster(Integer id, String eventGet) {
        this.id = id;
        this.eventGet = eventGet;
    }

    public Integer getId() { return id; }
    public String getEventGet() { return eventGet; }

    public void setId(Integer id) { this.id = id; }
    public void setEventGet(String eventGet) { this.eventGet = eventGet; }
}
