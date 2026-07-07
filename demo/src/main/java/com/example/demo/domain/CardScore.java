package com.example.demo.domain;

import org.springframework.stereotype.Component;

import com.example.demo.entity.CardScoreEntity;

import lombok.Getter;

@Getter
@Component
public class CardScore {
    public Integer calculationCardScore(CardScoreEntity cardScoreEntity, int cardLimitBreakCount){
        int resultScore = cardScoreEntity.getScore() + (int)Math.round(
                (cardScoreEntity.getLimitScore() - cardScoreEntity.getScore()) / 4.0 * cardLimitBreakCount
            );

        return resultScore;
    }
}
