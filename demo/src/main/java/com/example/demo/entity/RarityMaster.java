package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rarity_master")
public class RarityMaster {
    @Id
    private Integer id;

    @Column(nullable = false)
    private String rarity;

    public RarityMaster() {}

    public RarityMaster(String rarity) {
        this.rarity = rarity;
    }

    public Integer getId() { return id; }
    public String getRarity() { return rarity; }

    public void setRarity(String rarity) { this.rarity = rarity; }
}
