package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "plan_master")
public class PlanMaster {
    @Id
    private Integer id;

    @Column(nullable = false)
    private String plan;

    public PlanMaster() {}

    public PlanMaster(Integer id, String plan) {
        this.id = id;
        this.plan = plan;
    }

    public Integer getId() { return id; }
    public String getPlan() { return plan; }

    public void setId(Integer id) { this.id = id; }
    public void setPlan(String plan) { this.plan = plan; }
}
