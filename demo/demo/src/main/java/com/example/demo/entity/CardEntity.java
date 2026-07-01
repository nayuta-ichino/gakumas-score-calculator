package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String rarity;
    private String type;
    private int baseScore;
    private int scorePerLimitBreak;

    //デフォルトコンストラクタ
    public CardEntity(){}

    public CardEntity(String name, String rarity, String type, int baseScore, int scorePerLimitBreak){
        this.name = name;
        this.rarity =rarity;
        this.type = type;
        this.baseScore = baseScore;
        this.scorePerLimitBreak = scorePerLimitBreak;
    }

    //getter
    public Integer getId(){
        return id;
    }
    public String getName(){
        return name;
    }
    public String getRarity(){
        return rarity;
    }
    public String getType(){
        return type;
    }
    public int getBaseScore(){
        return baseScore;
    }
    public int getScorePerLimitBreak(){
        return scorePerLimitBreak;
    }

    //setter
    public void setName(String name){
        this.name = name;
    }
    public void setRarity(String rarity){
        this.rarity = rarity;
    }
    public void setType(String type){
        this.type = type;
    }
    public void setBaseScore(int baseScore){
        this.baseScore = baseScore;
    }
    public void setScorePerLimitBreak(int scorePerLimitBreak){
        this.scorePerLimitBreak = scorePerLimitBreak;
    }
}
