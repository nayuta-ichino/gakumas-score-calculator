package com.example.demo.domain;

import com.example.demo.entity.CardEntity;

public class CardCalculation{

    public int calculateFinalScore(CardEntity card, int limitBreakCount){
        return card.getBaseScore() + (limitBreakCount * card.getScorePerLimitBreak());
    }
}
