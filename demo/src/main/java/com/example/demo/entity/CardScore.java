package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "card_score")
public class CardScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_id", nullable =false)
    private Integer cardId;

    @Column(nullable = false)
    private Integer score;

    @Column(name = "limit_score", nullable = false)
    private Integer limitScore;
    
    public CardScore() {}

    public CardScore(Integer cardId, Integer limitScore, Integer score) {
        this.cardId = cardId;
        this.limitScore = limitScore;
        this.score = score;
    }

    // --- Getter ---
    public Long getId() { return id;}
    public Integer getCardId() { return cardId; }
    public Integer getLimitScore() { return limitScore; }
    public Integer getScore() { return score; }

    // --- Setter ---
    public void setCardId(Integer cardId) { this.cardId = cardId; }
    public void setLimitScore(Integer limitScore) { this.limitScore = limitScore; }
    public void setScore(Integer score) { this.score = score; }
}
