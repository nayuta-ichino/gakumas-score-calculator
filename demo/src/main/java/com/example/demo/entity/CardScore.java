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

    @Column(name = "limit_break", nullable = false)
    private Integer limitBreak;

    @Column(nullable = false)
    private Integer score;

    public CardScore() {}

    public CardScore(Integer cardId, Integer limitBreak, Integer score) {
        this.cardId = cardId;
        this.limitBreak = limitBreak;
        this.score = score;
    }

    // --- Getter ---
    public Long getId() { return id;}
    public Integer getCardId() { return cardId; }
    public Integer getLimitBreak() { return limitBreak; }
    public Integer getScore() { return score; }

    // --- Setter ---
    public void setCardId(Integer cardId) { this.cardId = cardId; }
    public void setLimitBreak(Integer limitBreak) { this.limitBreak = limitBreak; }
    public void setScore(Integer score) { this.score = score; }
}
