package com.example.demo.domain;

import org.springframework.stereotype.Component;

import com.example.demo.entity.CardEntity;

@Component
public class CardCalculation{
    public int calculateFinalScore(CardEntity card, int limitBreakCount){
        return card.getBaseScore() + (limitBreakCount * card.getScorePerLimitBreak());
    }
}
