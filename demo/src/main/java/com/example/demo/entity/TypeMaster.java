package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "type_master")
public class TypeMaster {
    @Id
    private Integer id;

    @Column(nullable = false)
    private String type;

    public TypeMaster() {}

    public TypeMaster(Integer id, String type) {
        this.id = id;
        this.type = type;
    }

    public Integer getId() { return id; }
    public String getType() { return type; }

    public void setId(Integer id) { this.id = id; }
    public void setType(String type) { this.type = type; }
}
